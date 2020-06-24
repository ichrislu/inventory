'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// Vue 配置请求本地json数据
const express = require('express');
const app = express();
const appData = require('../src/assets/user.json'); //加载本地json文件
const majorlist = appData.login; //获取本地对应数据
const apiRoutes = express.Router();
app.use('/api', apiRoutes);

// const express = require('express')
// const app = express()//请求server

// var appData = require('../src/mock/data.json')//加载本地数据文件
// var list = appData.list//获取对应的本地数据
// var add = appData.add
// var ratings = appData.ratings

// var apiRoutes = express.Router()
// app.use('/api', apiRoutes)//通过路由请求数据

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCSS: true
        })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [{
                from: /.*/,
                to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
            }, ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? {
            warnings: false,
            errors: true
        } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
        // ,
        // before(app) {
        //     app.get('/api/stock', (req, res) => {
        //       res.json({
        //         errno: 0,
        //         data: list
        //       })//接口返回json数据，上面配置的数据seller就赋值给data请求后调用
        //     }),
        //     app.post('/api/stock/add',(req, res) => {
        //       res.json({
        //             errno : 0,
        //             data : list
        //       })

        //     }),
        //     app.put('/api/stock', (req, res) => {
        //       res.json({
        //         errno: 0,
        //         data: add
        //       })
        //     })
		//   }
		,
        // before(app) {
        //     app.get('/api/majorlist', (req, res) => {
        //         res.json({
        //             error: 0,
        //             data: majorlist
        //         }); //接口返回json数据，上面配置的数据majorlist就赋值给data请求后调用
        //     });
        // }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'src/assets/img/favicon.ico',
            inject: true
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
        }])
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})
