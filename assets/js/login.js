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
        ],
        repwd: function(value) {

            if ($('#password').val().trim() !== value) { return '两次密码输入不一致' }
        }
    })
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.post('api/reguser', {
            username: $('#username').val().trim(),
            password: $('#password').val().trim()
        }, function(res) {
            if (res.status !== 0) {
                return layer.msg('用户名被占用，请更换其他用户名！');
            }
            layer.msg('注册成功')
            $('#link_reg').click()
                // $('.login_box').show()
                // $('.reg_box').hide()
                // $('#username1').val() = $('#username').val()
        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        console.log($(this).serialize());
        $.ajax({
            url: 'api/login',
            method: 'POST',
            data: $(this).serialize(),

            success: function(res) {
                console.log(res.message)
                console.log(res.status)
                if (res.status !== 0) {
                    // location.href = '/index.html'
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                    // console.log(res.token);
                location.href = '/index.html'

            }
        })
    })

})