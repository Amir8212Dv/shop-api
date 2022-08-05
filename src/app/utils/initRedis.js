import { createClient } from 'redis'

// const redis = createClient({
//     url : `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
// })
const redis = createClient()

export default redis