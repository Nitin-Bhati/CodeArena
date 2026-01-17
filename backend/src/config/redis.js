const { createClient }  = require('redis');

const redisClient = createClient({
   username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
      host: 'redis-15090.c15.us-east-1-2.ec2.cloud.redislabs.com',
        port: 15090
    }
});

module.exports = redisClient;