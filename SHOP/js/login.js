var username = document.querySelector(".username");
var password = document.querySelector(".password");
var btn = document.querySelector("button");
var namewarn = document.querySelector(".namewarn");
var pwdwarn = document.querySelector(".pwdwarn");

btn.addEventListener("click", function (e) {
  var info = {};
  e.preventDefault();
  var uname = username.value;
  var pwd = password.value;
  var nameRes = /^\w{6,12}$/;
  var pwdRes = /^\w{6,12}$/;
  if (!nameRes.test(uname)) {
    namewarn.style.visibility = "visible";
  } else {
    namewarn.style.visibility = "hidden";
    if (!pwdRes.test(pwd)) {
      pwdwarn.style.visibility = "visible";
    } else {
      pwdwarn.style.visibility = "hidden";
    }
  }

  if (nameRes.test(uname) && pwdRes.test(pwd)) {
    $.ajax({
      url: "http://vebcoder.cn:9527/api/login",
      data: {
        userName: uname,
        password: pwd,
      },
      method: "get",
      dataType: "json",
      success: function (data) {
        if (data.code === 1) {
          localStorage.setItem("token", data.token);
          // localStorage.setItem("userId", data.userId);
          // localStorage.setItem("userName", data.userName);
          var loading = window.parent.parent.document.querySelector(".loading");
          loading.style.display = "block";
          setTimeout(function () {
            loading.style.display = "none";
            location.href = "home.html";
            alert("登录成功！");
            self.parent.frames[0].dl.innerHTML = "购物车";
            self.parent.frames[0].zc.innerHTML = "退出登录";
            var lis = self.parent.frames[0].lis;
            lis[1].children[0].href = "shopcar.html";
            window.parent.parent.document.querySelector("body").style.height =
              1600 + "px";
            for (let i = 0; i < lis.length; i++) {
              lis[i].classList.remove("active");
            }
            lis[0].classList.add("active");
          }, 800);
        } else {
          var loading = window.parent.parent.document.querySelector(".loading");
          loading.style.display = "block";
          setTimeout(function () {
            loading.style.display = "none";
            alert("登录失败！");
          }, 800);
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
});
