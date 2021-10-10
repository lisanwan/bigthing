$(function() {
    var layer = layui.layer
    var form = layui.form
        //请求获取文章类别
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！')
                }
                console.log(res);
                var htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //添加文章分类
    // 为文章的分类提交后关闭弹出层
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog_add').html()
        });
        // 添加文章类别
        // form_table是动态创建出来的，所以用body代理的形式为form_table绑定提交事件
        $('body').on('submit', '#form_table', function(e) {
            e.preventDefault()
            $.ajax({
                url: '/my/article/addcates',
                method: 'POST',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('添加文章列别失败！')
                    }
                    layer.msg('添加文章列别成功！')
                    initArtCateList()
                    layer.close(indexAdd)
                }
            })
        })
    })

    //修改文章类别
    $('tbody').on('click', '.btn-edit', function() {
            var indexEdit = null;
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '修改文章分类',
                content: $('#dialog_Edit').html()
            })
            var id = $(this).attr('data_id')
            $.ajax({
                    method: 'GET',
                    url: '/my/article/cates/' + id,
                    success: function(res) {
                        form.val('form_Edit', res.data)
                    }
                })
                //提交修改文章请求
            $('body').on('submit', '#form_Edit', function(e) {
                e.preventDefault()
                $.ajax({
                    method: 'POST',
                    url: '/my/article/updatecate',
                    data: $(this).serialize(),
                    success: function(res) {
                        if (res.status != 0) {
                            return layer.msg('修改文章类别失败')
                        }
                        layer.msg('修改文章类别成功')
                        initArtCateList()
                            //关闭弹出层
                        layer.close(indexEdit)
                    }
                })
            })
        })
        // 删除文章类别
    $('tbody').on('click', '.btn_delete', function() {
        var id = $(this).attr('data_id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            console.log(id);
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg('删除文章类别失败')
                    }
                    layer.msg('删除文章类别成功')
                    initArtCateList()
                }
            })
            layer.close(index);
        });
    })

})