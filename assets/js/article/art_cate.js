$(function() {
    var layer = layui.layer
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


})