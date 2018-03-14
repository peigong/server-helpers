var fs = require('fs'),
    path = require('path');

function Config(path){
    this.path = path;
    this.configDir = '';
    this.settings = null;
}
Config.prototype.setConfigDir = function(dir) {
    this.configDir = dir;
};
Config.prototype.getSettings = function() {
    if(!this.settings){
        this.settings = require(path.join(this.configDir, this.path));
    }
    return this.settings;
};
Config.prototype.save = function() {
    if(!!this.settings && !!this.configDir){
        var data = JSON.stringify(this.settings, null, '\t');
        fs.writeFile(path.join(this.configDir, this.path), data, function(){});
    }
};
function createConfig(path){
    return new Config(path);
}

function ConfigHandler(dir){
    this.dir = dir;
    this.settings = {};
    this.dict = {
        'app': { 'file': 'settings.json' },
        'redis': { 'file': 'dao/redis.json' },
        'mongodb': { 'file': 'dao/mongodb.json' }
    };
    this.settings = this.getSettings('app');
}
ConfigHandler.prototype.getSettings = function(key){
    var settings = null;
    if(!!this.dir){
        if(!this.dict.hasOwnProperty(key)){
            this.dict[key] = {};
        }
        if(!this.dict[key].hasOwnProperty('settings')){
            var filename = '';
            if(this.dict[key].hasOwnProperty('file')){
                filename = this.dict[key].file;
            }else if(this.settings.hasOwnProperty(key)){
                filename = this.settings[key];
                this.dict[key].file = filename;
            }
            this.dict[key].config = createConfig(filename);
            this.dict[key].config.setConfigDir(this.dir);
            this.dict[key].settings = this.dict[key].config.getSettings();
        }
        settings = this.dict[key].settings;
    }
    return settings;
};
function createConfigHandler(dir){
    return new ConfigHandler(dir);
}

module.exports = {
    createConfig: createConfig,
    createConfigHandler: createConfigHandler
};