// 入口函数
$(function () {
  //绑定链接操作盒子、
  $('#link_reg').on('click', function () {
    $('.login_box').hide()
    $('.reg_box').show()
  })
  $('#link_login').on('click', function () {
    $('.login_box').show()
    $('.reg_box').hide()
  })

  //自定义验证规则
  var form = layui.form
  form.verify({
    //密码的规则
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    //确认密码的规则
    repwd: function (value) {
      var pwd = $('.reg_box input[name=password]').val()
      //比较
      if (value !== pwd) {
        return '两次输入的密码不一致'
      }
    }
  })
  var layer = layui.layer
  //注册功能
  $('#form_reg').on('submit', function (e) {
    //阻止表单默认提交
    e.preventDefault()
    //发送ajaxqQ请求
    $.ajax({
      method: 'post',
      url: '/api/reguser',
      data: {
        username: $('.reg_box [name=username]').val(),
        password: $('.reg_box [name=password]').val(),
      },
      success: function (res) {
        //判断状态
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录')
        //注册成功，自动模拟人的点击行为
        $('#link_login').click()
        //chong重置form表单
        $('#form_reg')[0].reset()
      }
    })
  })

  //监听表单的提交事件
  $('#form_login').on('submit',function(e){
    //阻止表单默认提交
    e.preventDefault()
    //发送ajax请求
    $.ajax({
      method:'post',
      url:'/api/login',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('登录失败')
        }
        layer.msg('登陆成功')
        //把登陆成功得到的tokenziguchuan保存到本地
        localStorage.setItem('token',res.token)

        //跳转到后台主页
        location.href='/index.html'
      }

    })
  })

})