$(function() {
    var form = layui.form
    var layer = layui.layer
        // 加载文章分类的方法
    initCate()
        // 初始化富文本编辑器
    initEditor()
        // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败')
                }
                console.log(res);
                var htmlStr = template('tpl-cate', res);
                $('#cate_id').html(htmlStr)
                    // layui表单更新渲染
                form.render();
            }
        })
    }
    // 实现基本裁剪效果
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
        // 更换裁剪的图片
        // 模拟用户选择图片封面，实际上是点击了file属性的选择文件
    $('#file').on('click', function() {
            $('.file').click()
        })
        // 当用户选择了文件后，file就会发生改变
    $('.file').on('change', function(e) {
        // 拿到用户选择的文件
        var file = e.target.files[0]
            // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
            // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })


    var art_state = '已发布';
    $('#publish').on('click', function() {
        art_state = '已发布';
    })
    $('#saved').on('click', function() {
        art_state = '草稿';
    })
    $('#form_publish').on('submit', function(e) {
        e.preventDefault()
            //    基于form表单，快速创建一个formDate对象
        var fd = new FormData($(this)[0])
            // 将文章的状态加入fd中
        fd.append('state', art_state)
            // 将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                fd.forEach(function(x, y) {
                        console.log(y, x);
                    })
                    // 发起ajax请求，发布文章功能
                $.ajax({
                    method: 'POST',
                    url: '/my/article/add',
                    data: fd,
                    // 如果向服务器提交的是FormDate格式的数据，必须添加以下2点
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if (res.status != 0) {
                            return layer.msg('发布文章失败')
                        }
                        layer.msg('发布文章成功')
                        location.href = '/article/art_list.html'
                    }
                })
            })
    })

})