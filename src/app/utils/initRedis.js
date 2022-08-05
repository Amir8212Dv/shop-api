import { createClient } from 'redis'

const redisHost = process.env.REDIS_HOST
const reidsPort = process.env.REDIS_PORT

const redisConnectionConfig = redisHost && reidsPort ? {url : `redis://${redisHost}:${reidsPort}`} : {}

const redis = createClient(redisConnectionConfig)

export default redis