setTimeout(function () {
  window.parent.parent.document.querySelector(".loading").style.display =
    "none";
}, 100);

window.addEventListener("load", function () {
  var shoplist = localStorage.getItem("shoplist");

  window.parent.parent.onscroll = function () {
    var scrolllength = window.parent.parent.document.documentElement.scrollTop;
    var dheight = window.parent.parent.document.body.clientHeight;
    var windowHeight = window.parent.parent.document.querySelector("body");
    if (dheight - scrolllength < 1000 && dheight - scrolllength > 900) {
      windowHeight.style.height =
        parseInt(windowHeight.style.height) + 1000 + "px";
    }
  };

  if (!shoplist) {
    $.ajax({
      url: "http://vebcoder.cn:9527/api/goodList",
      method: "get",
      data: {},
      dataType: "json",
      success: function (data) {
        data = JSON.stringify(data);
        localStorage.setItem("shoplist", data);
      },
      error: function (err) {
        console.log(err);
      },
    });
  } else {
    shoplist = JSON.parse(shoplist);
    for (let i = 0; i < shoplist.length; i++) {
      var { img_list_url, title, price, mack } = shoplist[i];
      var template = `<div class="shop">
      <div class="pic">
        <img src=${img_list_url} alt="" />
        <h3>${title}</h3>
      </div>
      <div class="info">
        <span class="fl">￥${price}</span>
        ${mack}
      </div>
    </div>`;
      $(".shopmore").append(template);
    }
    return;
  }
});

window.onload = function () {
  var arrow_l = document.querySelector(".arrow-l");
  var arrow_r = document.querySelector(".arrow-r");
  var banner = document.querySelector(".banner");
  var ul = document.querySelector(".lb");
  var bannerWidth = banner.offsetWidth;
  var num = 0;
  var flag = true;
  banner.addEventListener("mouseenter", function () {
    arrow_l.style.display = "block";
    arrow_r.style.display = "block";
    clearInterval(timer);
  });
  banner.addEventListener("mouseleave", function () {
    arrow_l.style.display = "none";
    arrow_r.style.display = "none";
    setInterval(function () {
      arrow_r.click();
    }, 2000);
  });
  arrow_l.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        ul.style.left = -5 * bannerWidth + "px";
        num = 5;
      }
      num--;
      animate(ul, -num * bannerWidth, function () {
        flag = true;
      });
    }
  });
  arrow_r.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 5) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * bannerWidth, function () {
        flag = true;
      });
    }
  });
  var timer = setInterval(function () {
    arrow_r.click();
  }, 2000);
};

var shop = document.querySelector(".shopmore").children;
setTimeout(function () {
  for (let i = 0; i < shop.length; i++) {
    shop[i].addEventListener("click", function () {
      window.parent.parent.document.querySelector(".loading").style.display =
        "block";
      window.parent.document.querySelector("#bottom").src = "view/detail.html";
      window.parent.parent.document.documentElement.scrollTop = 0;
      var shopInfo = localStorage.getItem("shoplist");
      shopInfo = JSON.parse(shopInfo);
      sessionStorage.setItem("id", shopInfo[i].Id);
      sessionStorage.setItem("typeone", shopInfo[i].type_one);
    });
  }
}, 100);

var namelist = document.querySelectorAll(".bar>ul>li");
namelist.forEach(function (item, index) {
  item.addEventListener("click", function () {
    var load = window.parent.parent.document.querySelector(".loading");
    load.style.display = "block";
    setTimeout(function () {
      load.style.display = "none";
    }, 500);
    for (let i = 0; i < namelist.length; i++) {
      namelist[i].classList.remove("active");
    }
    namelist[index].classList.add("active");
    window.parent.document.querySelector("#bottom").src = "view/shopcar.html";
    sessionStorage.setItem("change", index);
  });
});
