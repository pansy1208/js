var username = document.querySelector(".username");
var password = document.querySelector(".password");
var btn = document.querySelector("button");
var namewarn = document.querySelector(".namewarn");
var pwdwarn = document.querySelector(".pwdwarn");

btn.addEventListener("click", function (e) {
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
      url: "http://vebcoder.cn:9527/api/register",
      method: "get",
      dataType: "json",
      data: {
        userName: uname,
        password: pwd,
      },
      success: function (data) {
        if (data.code === 1) {
          var loading = window.parent.parent.document.querySelector(".loading");
          loading.style.display = "block";
          setTimeout(function () {
            loading.style.display = "none";
            location.href = "login.html";
            alert("注册成功");
            var lis = self.parent.frames[0].lis;
            for (let i = 0; i < lis.length; i++) {
              lis[i].classList.remove("active");
            }
            lis[1].classList.add("active");
          }, 1000);
        } else {
          alert("用户已注册");
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
});
