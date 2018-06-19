const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist') //虚拟服务路径
  },
   plugins:[
  
	new ExtractTextPlugin("./css/index.css"),
	new MiniCssExtractPlugin({
	    filename:'css/index.css'
	})
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
                     name: 'img/[name].[ext]'
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
			use:['style-loader','css-loader','less-loader']
	}	
        
      	
      
    ]
  }
}