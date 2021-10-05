$(function() {
    var form = layui.form
        // 表单验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        somepwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能与旧密码相同'
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    // 密码修改
    //    监听表单的提交行为
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    alert(55)
                    return layui.layer.msg('修改密码失败')
                }
                layui.layer.msg('修改密码成功')
                    // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})