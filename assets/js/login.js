$(function() {
    // 点击注册账号链接
    $('#link_login').on('click', function() {

            $('.login_box').hide()
            console.log(5);
            $('.reg_box').css('display', 'block');

        })
        // 点击登录账号链接
    $('#link_reg').on('click', function() {
        $('.login_box').show()
        $('.reg_box').hide()
    })

    // larui自定义规则
    var form = layui.form;
    form.verify({
        // 自定义一个不能有空格且6-16位的密码框
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    })
})