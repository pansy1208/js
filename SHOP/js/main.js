var dl = document.querySelector(".dl");
var zc = document.querySelector(".zc");
var sy = document.querySelector(".sy");
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
    window.parent.parent.document.querySelector(".tabbar").style.display =
      "none";
  });
});
var token = localStorage.getItem("token");
if (token) {
  dl.innerHTML = "购物车";
  zc.innerHTML = "退出登录";
  dl.href = "shopcar.html";
  dl.addEventListener("click", function () {
    console.log('???');
    var tabli = window.parent.parent.document.querySelectorAll(
      ".leftScroll>li"
    );
    for (let i = 0; i < tabli.length; i++) {
      tabli[i].parentNode.removeChild(tabli[i]);
    }
  });
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
    window.parent.parent.document.querySelector("body").style.height =
      window.parent.parent.innerHeight + "px";
  }
});
dl.addEventListener("click", function () {
  if (dl.innerHTML == "登录") {
    window.parent.parent.document.querySelector("body").style.height =
      window.parent.parent.innerHeight + "px";

  } else {
    window.parent.parent.document.querySelector("body").style.height =
      1600 + "px";
  }
});
sy.addEventListener("click", function () {
  window.parent.parent.document.querySelector("body").style.height =
    1600 + "px";
  var tabli = window.parent.parent.document.querySelectorAll(".leftScroll>li");
  for (let i = 0; i < tabli.length; i++) {
    tabli[i].parentNode.removeChild(tabli[i]);
  }
});
