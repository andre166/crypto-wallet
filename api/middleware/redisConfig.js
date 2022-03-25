import Redis from "ioredis";
import { promisify } from "util";

const redisClient = new Redis();

function getRedis(value) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(value);
}

function setRedis(key, value) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value);
}

function delRedis(key, value) {
  const syncRedisDel = promisify(redisClient.del).bind(redisClient);
  return syncRedisDel(key, value);
}

export { getRedis, setRedis, delRedis };
