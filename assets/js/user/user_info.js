$(function() {
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                console.log(548);
                return '用户昵称不得大于6个字符'
            }
        }
    })

    initUserInfo()
        // 获取用户信息
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function(res) {
                if (res.status != 0) {
                    layer.msg('获取用户信息失败')
                }
                $('#username').html(res.data.username)
                console.log(res.data);
                form.val('formUserInfo', res.data)
                readUserInfo(res.data)

            }
        })
    }
    // 重置用户信息
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()

    })

    // 提交修改用户信息
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！')
                    //    子页面调用父页面的方法
                window.parent.getUserInfo()
            }
        })
    })
})