var util = require('./util.js'),
    pool = require('./pool.js'),
    config = require('./config.js'),
    redis = require('./dao/redis.js'),
    mongodb = require('./dao/mongodb.js');

module.exports = {
    createGUID: util.createGUID,
    createConfig: config.createConfig,
    createConfigHandler: config.createConfigHandler,
    createPoolFactory: pool.createPoolFactory,
    redis: redis,
    mongodb: mongodb
};