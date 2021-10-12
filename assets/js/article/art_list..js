$(function() {
    var form = layui.form
    var layer = layui.layer
        // 分页
    var laypage = layui.laypage
        // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(data) {
            const dt = new Date(data)

            var y = dt.getFullYear()
            var m = padZero(dt.getMonth() + 1)
            var d = padZero(dt.getDate())
            var h = padZero(dt.getHours())
            var mm = padZero(dt.getMinutes())
            var s = padZero(dt.getSeconds())

            return y + '-' + m + '-' + d + '' + h + ':' + mm + ':' + s
        }
        // 补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 定义一个查询的参数，将来请求时用
    var q = {
        pagenum: 1, //页码值
        pagesize: 6, //每页显示多少条数据
        cate_id: '', //	文章分类的 Id
        state: '', //文章的状态，可选值有：已发布、草稿
    }


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
                var htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr);
                layer.msg('获取文章列表成功')
                console.log(res);
                renderPage(res.total)
            }
        })
    }
    initCate()
        // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败')
                }
                var htmlStr2 = template('wenzhang', res)
                $('[name=cate_id]').html(htmlStr2)
                form.render()
            }
        })
    }


    // 筛选功能
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    // 分页
    function renderPage(total) {
        laypage.render({
            elem: "pageBox",
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['prev', 'limit', 'page', 'skip', 'next'],
            limits: [2, 4, 6, 8],
            // 当分页发生切换时，触发jump回调函数
            // jump有2中触发方法
            // 1是分页被点击
            // 2是执行 initTable()
            jump: function(obj, first) {
                // 把最新的页码数赋值到q.pagenum中
                q.pagenum = obj.curr
                    // 把最新的条目赋值到q.pagesize
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 删除功能
    $('tbody').on('click', '.btn-delete', function() {
        // 删除按钮的个数
        var len = $('.btn-delete').length
        console.log(len);
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        q.pagesize = q.pagesize === 1 ? 1 : q.pagesize - 1
                    }
                    initTable()
                }
            })
            layer.close(index);
        });

    })

    // 编辑功能
    $('tbody').on('click', '.btn-bj', function() {
        var id2 = $(this).attr('data-id')

        // location.href = '/article/art_pub.html'
        $.ajax({
            url: '/my/article/cates/' + id2,
            method: 'GET',
            success: function(res) {
                console.log(res.data)
                location.href = '/article/art_pub.html'
            }
        })
    })

})