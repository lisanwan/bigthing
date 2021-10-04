// jquery在每次调用ajax请求或者post请求或者get请求时，先执行函数
$.ajaxPrefilter(function(options) {
    // 再发起真正的请求之前，统一拼接好请求的url路径
    options.url = 'http://api-breakingnews-web.itheima.net/' + options.url
    console.log(options.url);
    // 统一为有权限的接口，设置headers请求头
    // 判断是否有/my这3个字符，有的话才会调用headers请求头
    if (options.url.indexOf('/my') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 无论成不成功都会调用complete回调函数
    options.complete = function(res) {
        //res.responseJSON可以拿到服务器响应回来的数据
        console.log(res.responseJSON);
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            // 清空本地存储的token
            localStorage.removeItem('token')
                // 跳转回登录页面
            location.href = '/login.html'
        }
    }
})