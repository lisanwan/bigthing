$(function() {
        // 调用getUserInfo() 获取用户基本信息 
        getUserInfo()
        $('#tuichu').on('click', function() {
            //退出提示框
            layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
                //do something
                // layer.close(index);
                // 清空本地存储的token
                localStorage.removeItem('token')
                    // 跳转回登录页面
                location.href = '/login.html'
                    // 关闭询问框
                layer.close(index);
            });
        })
    })
    // 获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status != 0) { return layer.msg('获取用户信息失败') }
            // layer.msg('获取用户信息成功')
            // 调用renderAvatar()渲染用户头像及名称
            renderAvatar(res.data)
        },
    })
}

function renderAvatar(user) {
    console.log(user);
    // 获取用户名称
    var name = user.nickname || user.username;
    console.log(name);
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    // 渲染用户头像\
    if (user.user_pic != null)
    // 渲染图片头像
    {
        $('.userinfo img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    // 渲染文本头像
    else {
        $('.userinfo img').hide()
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first)
        $('.text-avatar').show()
    }
}