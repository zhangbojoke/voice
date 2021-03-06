<?php
/**
 * Created by PhpStorm.
 * User: zhangBo
 * Date: 2018/5/4
 * Time: 16:46
 */
class FileCache
{
    /**
     * @var string a string prefixed to every cache key. This is needed when you store
     * cache data under the same [[cachePath]] for different applications to avoid
     * conflict.
     *
     * To ensure interoperability, only alphanumeric characters should be used.
     */
    public $keyPrefix = '';
    /**
     * @var string the directory to store cache files. You may use path alias here.
     * If not set, it will use the "cache" subdirectory under the application runtime path.
     */
    public $cachePath = '';
    /**
     * @var string cache file suffix. Defaults to '.bin'.
     */
    public $cacheFileSuffix = '.bin';
    /**
     * @var integer the level of sub-directories to store cache files. Defaults to 1.
     * If the system has huge number of cache files (e.g. one million), you may use a bigger value
     * (usually no bigger than 3). Using sub-directories is mainly to ensure the file system
     * is not over burdened with a single directory having too many files.
     */
    public $directoryLevel = 1;
    /**
     * @var integer the probability (parts per million) that garbage collection (GC) should be performed
     * when storing a piece of data in the cache. Defaults to 10, meaning 0.001% chance.
     * This number should be between 0 and 1000000. A value 0 means no GC will be performed at all.
     */
    public $gcProbability = 10;
    /**
     * @var integer the permission to be set for newly created cache files.
     * This value will be used by PHP chmod() function. No umask will be applied.
     * If not set, the permission will be determined by the current environment.
     */
    public $fileMode;
    /**
     * @var integer the permission to be set for newly created directories.
     * This value will be used by PHP chmod() function. No umask will be applied.
     * Defaults to 0775, meaning the directory is read-writable by owner and group,
     * but read-only for other users.
     */
    public $dirMode = 0775;

    /**
     * 初始化
     */
    function __construct()
    {
        $this->cachePath = './cache';
    }

    function FileCache()
    {
        $this->__construct();
    }

    /**
     * Stores a value identified by a key into cache.
     * If the cache already contains such a key, the existing value and
     * expiration time will be replaced with the new ones, respectively.
     *
     * @param mixed $key a key identifying the value to be cached. This can be a simple string or
     * a complex data structure consisting of factors representing the key.
     * @param mixed $value the value to be cached
     * @param integer $duration the number of seconds in which the cached value will expire. 0 means never expire.
     * the corresponding value in the cache will be invalidated when it is fetched via [[get()]].
     * This parameter is ignored if [[serializer]] is false.
     * @return boolean whether the value is successfully stored into cache
     */
    public function set($key, $value, $duration = 0)
    {
        $value = serialize([$value]);
        $key = $this->buildKey($key);
        return $this->setValue($key, $value, $duration);
    }

    /**
     * Retrieves a value from cache with a specified key.
     * @param mixed $key a key identifying the cached value. This can be a simple string or
     * a complex data structure consisting of factors representing the key.
     * @return mixed the value stored in cache, false if the value is not in the cache, expired,
     * or the dependency associated with the cached data has changed.
     */
    public function get($key)
    {
        $key = $this->buildKey($key);
        $value = $this->getValue($key);
        if ($value === false) {
            return $value;
        } else {
            $value = unserialize($value);
        }
        if (is_array($value)) {
            return $value[0];
        } else {
            return false;
        }
    }

    /**
     * Deletes a value with the specified key from cache
     * @param mixed $key a key identifying the value to be deleted from cache. This can be a simple string or
     * a complex data structure consisting of factors representing the key.
     * @return boolean if no error happens during deletion
     */
    public function delete($key)
    {
        $key = $this->buildKey($key);

        return $this->deleteValue($key);
    }

    /**
     * Builds a normalized cache key from a given key.
     *
     * If the given key is a string containing alphanumeric characters only and no more than 32 characters,
     * then the key will be returned back prefixed with [[keyPrefix]]. Otherwise, a normalized key
     * is generated by serializing the given key, applying MD5 hashing, and prefixing with [[keyPrefix]].
     *
     * @param mixed $key the key to be normalized
     * @return string the generated cache key
     */
    public function buildKey($key)
    {
        if (is_string($key)) {
            $key = ctype_alnum($key) && mb_strlen($key, '8bit') <= 32 ? $key : md5($key);
        } else {
            $key = md5(json_encode($key, JSON_NUMERIC_CHECK));
        }

        return $this->keyPrefix . $key;
    }

    /**
     * Stores a value identified by a key in cache.
     * This is the implementation of the method declared in the parent class.
     *
     * @param string $key the key identifying the value to be cached
     * @param string $value the value to be cached
     * @param integer $duration the number of seconds in which the cached value will expire. 0 means never expire.
     * @return boolean true if the value is successfully stored into cache, false otherwise
     */
    protected function setValue($key, $value, $duration)
    {
        $this->gc();
        $cacheFile = $this->getCacheFile($key);
        if ($this->directoryLevel > 0) {
            @mkdir(dirname($cacheFile), $this->dirMode, true);
        }
        if (@file_put_contents($cacheFile, $value, LOCK_EX) !== false) {
            if ($this->fileMode !== null) {
                @chmod($cacheFile, $this->fileMode);
            }
            if ($duration <= 0) {
                $duration = 31536000; // 1 year
            }

            return @touch($cacheFile, $duration + time());
        } else {
            $error = error_get_last();
            return false;
        }
    }

    /**
     * Retrieves a value from cache with a specified key.
     * This is the implementation of the method declared in the parent class.
     * @param string $key a unique key identifying the cached value
     * @return string|boolean the value stored in cache, false if the value is not in the cache or expired.
     */
    protected function getValue($key)
    {
        $cacheFile = $this->getCacheFile($key);

        if (@filemtime($cacheFile) > time()) {
            $fp = @fopen($cacheFile, 'r');
            if ($fp !== false) {
                @flock($fp, LOCK_SH);
                $cacheValue = @stream_get_contents($fp);
                @flock($fp, LOCK_UN);
                @fclose($fp);
                return $cacheValue;
            }
        }

        return false;
    }

    /**
     * Deletes a value with the specified key from cache
     * This is the implementation of the method declared in the parent class.
     * @param string $key the key of the value to be deleted
     * @return boolean if no error happens during deletion
     */
    protected function deleteValue($key)
    {
        $cacheFile = $this->getCacheFile($key);

        return @unlink($cacheFile);
    }

    /**
     * Returns the cache file path given the cache key.
     * @param string $key cache key
     * @return string the cache file path
     */
    protected function getCacheFile($key)
    {
        if ($this->directoryLevel > 0) {
            $base = $this->cachePath;
            for ($i = 0; $i < $this->directoryLevel; ++$i) {
                if (($prefix = substr($key, $i + $i, 2)) !== false) {
                    $base .= DIRECTORY_SEPARATOR . $prefix;
                }
            }

            return $base . DIRECTORY_SEPARATOR . $key . $this->cacheFileSuffix;
        } else {
            return $this->cachePath . DIRECTORY_SEPARATOR . $key . $this->cacheFileSuffix;
        }
    }

    /**
     * Removes expired cache files.
     * @param boolean $force whether to enforce the garbage collection regardless of [[gcProbability]].
     * Defaults to false, meaning the actual deletion happens with the probability as specified by [[gcProbability]].
     * @param boolean $expiredOnly whether to removed expired cache files only.
     * If false, all cache files under [[cachePath]] will be removed.
     */
    public function gc($force = false, $expiredOnly = true)
    {
        if ($force || mt_rand(0, 1000000) < $this->gcProbability) {
            $this->gcRecursive($this->cachePath, $expiredOnly);
        }
    }

    /**
     * Recursively removing expired cache files under a directory.
     * This method is mainly used by [[gc()]].
     * @param string $path the directory under which expired cache files are removed.
     * @param boolean $expiredOnly whether to only remove expired cache files. If false, all files
     * under `$path` will be removed.
     */
    protected function gcRecursive($path, $expiredOnly)
    {
        if (($handle = opendir($path)) !== false) {
            while (($file = readdir($handle)) !== false) {
                if ($file[0] === '.') {
                    continue;
                }
                $fullPath = $path . DIRECTORY_SEPARATOR . $file;
                if (is_dir($fullPath)) {
                    $this->gcRecursive($fullPath, $expiredOnly);
                    if (!$expiredOnly) {
                        if (!@rmdir($fullPath)) {
                            $error = error_get_last();
                        }
                    }
                } elseif (!$expiredOnly || $expiredOnly && @filemtime($fullPath) < time()) {
                    if (!@unlink($fullPath)) {
                        $error = error_get_last();
                    }
                }
            }
            closedir($handle);
        }
    }
}
class request{
    public $appId = 'wxc876727e95f7b8bc';
    public $secret = 'wxc876727e95f7b8bc';
    public $cache;
    function __construct()
    {
        $this->cache = new FileCache();
    }

    public function getToken(){
        if($this->cache->get('token') && $this->cache->get('expire') >= time()){
            return $this->cache->get('token');
        }else{
            $res = $this->getTokenByServer();
            if(isset($res['errcode'])){
                //如果出现了err 那么就代表出现了错误 返回false
                return false;
            }
            //否则是返回正确 记录token并返回
            $this->cache->set('token','token');
            $this->cache->set('expire',time()+7200);
            return 'token';
        }
    }

    public function getTokenByServer(){
        $params = [
            'appid' => $this->appId,
            'secret' => $this->secret,
            'grant_type' => 'client_credential',
        ];
        $res = $this->callServer('https://api.weixin.qq.com/cgi-bin/token',$params,'POST');
        return $res;
    }

    public function getTicket(){
        if($this->cache->get('ticket') && $this->cache->get('expire_t') >= time()){
            return $this->cache->get('token');
        }else{
            $res = $this->getTokenByServer();
            if(isset($res['errcode'])){
                //如果出现了err 那么就代表出现了错误 返回false
                return false;
            }
            //否则是返回正确 记录token并返回
            $this->cache->set('ticket','token');
            $this->cache->set('expire_t',time()+7200);
            return 'token';
        }
    }

    public function getTicketByServer(){
        return $this->callServer('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='.$this->getToken().'&type=jsapi',[],'GET');
    }

    public function getNonceStr($length = 32)
    {
        $chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        $str ="";
        for ( $i = 0; $i < $length; $i++ )  {
            $str .= substr($chars, mt_rand(0, strlen($chars)-1), 1);
        }
        return $str;
    }

    private function callServer($url,$options,$method='GET'){
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL,$url);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
//        curl_setopt($curl,CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST,false);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $options );
        $res = curl_exec($curl);
        if (curl_errno($curl)) {
            throw new Exception(curl_error($curl), 0);
        } else {
            $httpStatusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            if (200 !== $httpStatusCode) {
                throw new Exception($res, $httpStatusCode);
            }
        }
        curl_close($curl);
        return json_decode($res,true);
    }

    public function getParams(){
        $params['noncestr'] = $this->getNonceStr();
        $params['timestamp'] = "" . time();
        $params['jsapi_ticket'] = $this->getTicket();
        $params['url'] = 'http://' . $_SERVER['HTTP_HOST'];
        ksort($params);
        $buff = '';
        foreach ($params as $k => $v) {
            if ($k != "sign" && $v != "" && !is_array($v)) {
                $buff .= $k . "=" . $v . "&";
            }
        }
        $buff = substr($buff, 0, -1);
        $params['signature'] = sha1($buff);
        return $params;
    }
}
$model = new request();
echo json_encode($model->getParams());
?>