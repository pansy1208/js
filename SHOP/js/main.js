var dl = document.querySelector(".dl");
var zc = document.querySelector(".zc");
var lis = document.querySelectorAll(".bottom>ul>li");
lis.forEach(function (item) {
  item.addEventListener("click", function () {
    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove("active");
    }
    item.classList.add("active");
    window.parent.parent.document.querySelector(".loading").style.display =
      "block";
    setTimeout(function () {
      window.parent.parent.document.querySelector(".loading").style.display =
        "none";
    }, 400);
  });
});
var token = localStorage.getItem("token");
if (token) {
  dl.innerHTML = "购物车";
  zc.innerHTML = "退出登录";
  dl.href = "shopcar.html";
}
zc.addEventListener("click", function () {
  if (zc.innerHTML == "退出登录") {
    localStorage.removeItem("token");
    lis[2].children[0].href = "javascript:;";
    dl.innerHTML = "登录";
    zc.innerHTML = "注册";
    lis[1].children[0].href = "login.html";
  } else {
    lis[2].children[0].href = "resgiter.html";
  }
});
