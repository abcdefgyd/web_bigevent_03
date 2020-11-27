//入口函数
$(function () {
    //Huoquyonghuxinxi 获取用户信息
    getUserInfo()
})

//封装函数，但必须写到全局，后面其他的页面要调用
function getUserInfo() {
    //发送ajax
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);

            //判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}

//封装用户头像渲染函数
function renderAvatar(user) {
    //用户名，昵称优先，没有用username
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    //2用户头像
    if(user.user_pic!==null){
        //有头像
        $('.layui-nav-img').show().attr('src',user.user_pic)
        $('.user-avatar').hide()
    }else{
        //meiyoutouxiang 
        $('.layui-nav-img').hide()
        var text=name[0].toUpperCase()
        $('.user-avatar').show().html(text)
    }
}