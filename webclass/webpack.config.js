var htmlWebpackPlugin = require('html-webpack-plugin');//html插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");//css压缩插件
var uglifyjs = require('uglifyjs-webpack-plugin');//js压缩插件


module.exports = {
    entry: {//入口点
        app: './entry/app.js',
        vendors: './entry/vendors.js',

    },
    output: {//出口点
        //  filename : '[name].bundle.js',
        //   path : __dirname + './dist'
        filename: '[name].list.js',
        path: __dirname + '/out'
    },
    module: {
        rules: [{
            test: /\.css$/,
            //    use : [{loader : 'style-loader'},{loader : 'css-loader'}] //不抽离css
            use: ExtractTextPlugin.extract({//抽离css    
                use: [{
                    loader: 'css-loader',

                    options: {
                        minimize: true //压缩css代码
                    },
                }//,{loader : 'postcss-loader'}//生成css前缀兼容
                ],
                fallback: 'style-loader',

            })
        },
        {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({//抽离css    
                use: [{
                    loader: 'css-loader'
                },
                {
                    loader: 'less-loader'
                }
                ],
                fallback: 'style-loader',

            })
        },
        {
            //图片加载器
            test: /.(jpg|png|gif|svg)$/,//limit的值是否打包或转base：64链接，name.图片类型(jpg,png....)
            use: ['url-loader?limit=8192&name=./[name].[ext]']
        }
        ]
    },
    mode: 'development', //开发坏境，不压缩代码
    //  mode : 'production',//生产环境,压缩代码
    plugins: [
        new htmlWebpackPlugin({//html
            title: '测试',
            filename: 'app.html',//输出名称
            template: './index.html',//以index.html为模板
            inject: 'body', //head,true,false 
            chunks: ['app'],//引入指定的js，不全部加载js
            hash: true,//在js，css链接后面生成hash值
            minify: {
                removeComments: true,//移除HTML中的注释
                //   collapseWhitespace : true//删除空白符与换行符，false不删除
            }
        }),
        new ExtractTextPlugin("[name].css"),//压缩css
        new uglifyjs(),//压缩js


    ],

}