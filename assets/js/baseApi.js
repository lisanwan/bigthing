// jquery在每次调用ajax请求或者post请求或者get请求时，先执行函数
$.ajaxPrefilter(function(options) {
    // 再发起真正的请求之前，统一拼接好请求的url路径
    options.url = 'http://api-breakingnews-web.itheima.net/' + options.url
    console.log(options.url);
})