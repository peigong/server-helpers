var Q = require('q'),
    _ = require('lodash'),
    redis = require("redis");

var pool = require('../pool.js');

var factory = pool.createPoolFactory('redis'),
    factories = {},
    config = {
        'host': '127.0.0.1',
        'port': '6379',
        'dict': {
            'basic': 1
        },
        'max': 1e4,
        'min': 0
    };

function create(settings, callback){
    var idx = config.dict[settings.dbname] * 1,
        client = redis.createClient(settings.port, settings.host);
    client.select(idx, function(err){
        callback(err, client);
    });
}
function destroy(client){
    if(client && client.end){
        client.end();
    }
}
function createClient(dbname){
    var deferred = Q.defer();
    if(config && config.host && config.port && config.dict && config.dict.hasOwnProperty(dbname)){
        var max = config.max || 1,
            min = config.min || 0;
        if(!factories.hasOwnProperty(dbname)){
            var settings = { 
                dbname: dbname,
                host: config.host,
                port: config.port
            };
            factories[dbname] = factory.create(dbname, create, destroy, settings, max, min);
        }
        factories[dbname].acquire(function(err, client) {
          if(err){
            deferred.reject(err);
          }
          deferred.resolve(client);
        });
    }else{
        deferred.reject(new Error('redis config err'));
    }
    return deferred.promise;
}

function release(dbname, client){
    if(factories.hasOwnProperty(dbname) && factories[dbname]){
        var pool = factories[dbname];
        if(pool && pool.release){
            pool.release(client);
        }
    }
}

module.exports = function(settings){
    config = _.extend(config, settings);
    return {
        createClient: createClient,
        release: release
    };
};