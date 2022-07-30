const { merge } = require('webpack-merge')
const path = require('path');
const commonConfiguration = require('./webpack.config.js')
const ip = require('ip')
const portFinderSync = require('portfinder-sync')

const infoColor = (_message) =>
{
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            client:{
                webSocketURL: {
                    hostname: '0.0.0.0',
                    port: 8080,
                   
                  },
                overlay: true,
            },
            static: {
                directory: path.join(__dirname, './dist'),
            },
           
            open: true,
            server: 'http',
            
            
            
        }
    }
)
