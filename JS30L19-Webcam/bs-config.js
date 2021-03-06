
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
    "ui": {
        "port": 3001
    },
    "files": "*.css, *.html, *.js",       
    "server": true,    
    "port": 3000,    
    "logLevel": "debug",
    "online": true,
    "tunnel": true
};