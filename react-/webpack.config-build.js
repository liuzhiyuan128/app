const path = require('path')
const CleanWebpackPlgin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist') //打包完成的路径
  },
  plugins:[
  	new CleanWebpackPlgin(['dist']),//打包之前清空目录
	new HtmlWebpackPlugin({
		template:"./index.html"//打包之后的模板文件
	}),
	new ExtractTextPlugin("./css/index.css")
	
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],//解析jsx语法，
          plugins: ['@babel/plugin-proposal-class-properties']//解析高es6语法
        }
      },
       {
        test: /\.(png|jpg|gif|PNG)$/,
        use: [
       
          {
            loader: 'file-loader?limit=25000',
            options: {
                     name: '/img/[name].[ext]'
                }
          }
          
        ]
       },
      {
      	test:/\.css$/,
	      	use:ExtractTextPlugin.extract({
			    fallback:'style-loader',
			    use:'css-loader',
			    publicPath:'../' //解决css背景图，路径问题
				})
      },
      {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','less-loader']
                })
            }
        
      	
      
    ]
  }
}