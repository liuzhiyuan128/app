const baseUrl = "http://192.168.10.122:8888"
// const baseUrl = "http://118.31.7.200:8091/" //阿里云 const baseUrl =
// "http://192.168.10.157:8091/" //西泉
//    const baseUrl = "http://192.168.1.4:8888/"
const inter = {
    baseUrl,
    login: {
        login: '/login' //登陆
    },
    system: {
        getUserList: '/system/getUserList', //获取用户列表
        addUser: '/system/addUser',//添加用户,
        deleteUser: '/system/deleteUser'
    }
}

export default inter

