const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CODEMIRROR_PATH = path.resolve(__dirname, "./node_modules/swiper");
module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    resolve: {
      alias: {
        resource: path.resolve(__dirname, "src/assets"),
      },
    },
    
    output:
    {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        assetModuleFilename: "assets/[name][ext][query]",
        clean: true,
        
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
    //   new CopyWebpackPlugin({
    //     patterns: [
    //         { from: path.resolve(__dirname, './src') }
    //     ]
    // }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            minify: true
        }),
        new MiniCssExtractPlugin(
          {
            filename: "style.css",
    
          }
        )
      ],
      module:
      {
          
          rules:
          [
              // HTML
              {
                  test: /\.(html)$/,
                  use: ['html-loader']
              },
  
              // JS
              {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  use:
                  [
                      'babel-loader'
                  ]
              },
              
              // CSS
              {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
              },
              {
                  test: /\.s[ac]ss$/,
                  
                  use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",

                    "resolve-url-loader",
                    // Compiles Sass to CSS
                    {
                      loader: 'sass-loader',
                      options: {
                        sourceMap: true, // <-- !!IMPORTANT!!
                      }
                    },

                    
                    
                  ],
                },
  
              // Images
              
              // {
              //     test: /\.(jpg|png|gif|svg)$/,
              //     use:
              //     [
              //         {
              //             loader: 'file-loader',
              //             options:
              //             {
              //                 // name:'[name].[hash:6].[ext]',
              //                 outputPath: 'assets/image',
              //                 // publicPath:'assets',
              //                 // emitFile: true,
              //                 // esModule:false
  
              //             }
              //         }
              //     ]
              // },
              // gltf, glb
              {
                  test: /\.(gltf|glb)$/,
                  use: [
                    {
                      loader: "file-loader",
                      // options:
                      //     {
                      //         outputPath: 'assets',
                      //         name: '[path][name].[ext]',
                      //         publicPath:'assets',
                      //         outputPath: 'assets',
                      //         emitFile: true,
                      //         esModule:false

                      //     }
                    }
                  ]
                },
                {
                  test : /\.(jpe?g|gif|png|svg)$/i,
                  dependency: { not: ['url'] },
                  use : {
                    loader: "url-loader",
                    options: {
                      limit: 10000,
                      name: "[name].[ext]"
                    }
                  },
                  type: 'javascript/auto'
                },
                {
                  test: /\.(bin)$/,
                  use: [
                    {
                      loader: 'file-loader',
                      options: {}
                    }
                  ]
                },
              // Fonts
              {
                  test: /\.(ttf|eot|woff|woff2)$/,
                  use:
                  [
                      {
                          loader: 'file-loader',
                          options:
                          {
                              outputPath: 'assets/fonts/'
                          }
                      }
                  ]
              }
          ]
      },
    
}
