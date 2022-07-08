const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CODEMIRROR_PATH = path.resolve(__dirname, "./node_modules/swiper");
module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output:
    {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
        assetModuleFilename: "assets/[name][ext]",
        clean: true,
        
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
            { from: path.resolve(__dirname, './src/assets') }
        ]
    }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            minify: true
        }),
        // new MiniCSSExtractPlugin()
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
                test: /\.css$/i,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
              },
              {
                  test: /\.s[ac]ss$/i,
                  
                  use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
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
              //                 name:'[name].[hash:6].[ext]',
              //                 outputPath: 'assets',
              //                 publicPath:'assets',
              //                 emitFile: true,
              //                 esModule:false
  
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
                      options:
                          {
                              outputPath: 'assets/glb/'
                          }
                    }
                  ]
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
