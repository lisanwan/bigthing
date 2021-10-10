$(function() {
    // 定义一个查询的参数，将来请求时用
    var q = {
        pagenum: 10, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //	文章分类的 Id
        state: '', //文章的状态，可选值有：已发布、草稿
    }

    $.ajax({
        method: 'POST',
        url: '/my/article/add',
        FormData: {
            title: 2,
            cate_id: 2,
            content: 155,
            cover_img: '23',
            state: '已发布'
        },
        success: function(res) {
            console.log(5);
            console.log(res);
        }
    })
    initTable()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败')
                }
                console.log(res);
                var htmlStr = template('tpl_table', res)
                $('body tbody').html(htmlStr);
                layer.msg('获取文章列表成功')
            }
        })
    }
})