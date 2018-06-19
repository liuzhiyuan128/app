
npm run dev 启动项目  在css文件里 用背景图片需要注意 一直没有解决
<br/>
npm run build 打包项目  我尝试着把css文件单独提取出来 就按照打包文件思路配置css文件 
                           有一个问题就是没有压缩css文件需要单独压缩  如果想在引入css文件可以在index.html里加link引入 
                           如 link rel="stylesheet" type="text/css" href="css/index.css"
<br/>
路由的问题 用的是 BrowserRouter 这是路径跳转 如果刷新或者或者路径会出现找不到页面情况
上线的时候需要 配置服务器 如果找不到页面 反回index.html页面 

<br/>
引入了阿里的ui--antd 经过 ie仿真测试可以兼容到ie8



<br/>
总结了上一个app的ajax数据的请求给予axios封装一个函数 其调用方法   ajax({url:"login",type:"post",data{a:""},successfunction(res){}})



<br/>
router.js 分发组件的作用 只要引入一个router.js 就可以获取所有需要的组件
<br/>
2018/5/22 15:18 很久没有推了 现在的记录跟以前没有关系
<br/>
用node简单做了登陆功能 一些死数据 请求数据是可跨域的

