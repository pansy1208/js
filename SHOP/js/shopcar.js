setTimeout(function () {
  window.parent.parent.document.querySelector(".loading").style.display =
    "none";
}, 800);
var change = sessionStorage.getItem("change");
var lis = document.querySelectorAll(".bar>ul>li");
window.parent.parent.document.querySelector(".tabbar").style.display = "block";
lis[change].classList.add("active");
var changevalue = lis[change].innerText;
var shoplist = localStorage.getItem("shoplist");
shoplist = JSON.parse(shoplist);
var shopArr = [];
var shopTwo = [];
for (let i = 0; i < shoplist.length; i++) {
  if (shoplist[i].type_one == changevalue) {
    shopArr.push(shoplist[i]);
    shopTwo.push(shoplist[i].type_two);
  }
}
shopTwo = [...new Set(shopTwo)];
for (let j = 0; j < shopTwo.length; j++) {
  var leftscroll = `<li>${shopTwo[j]}</li>`;
  window.parent.parent.$(".leftScroll").append(leftscroll);
  var type = `<div class="title">
  <h2>${shopTwo[j]}</h2>
</div>`;
  $(".shopmore").append(type);
  for (let i = 0; i < shopArr.length; i++) {
    var { type_two, img_list_url, price, mack, title } = shopArr[i];
    if (type_two == shopTwo[j]) {
      var template = `<div class="detail">
<div>
  <div class="shop">
    <img src="${img_list_url}" alt="" />
  </div>
  <div>
    <h3>${title}</h3>
  </div>
  <div class="info">
    <span class="fl">￥${price}</span>
    ${mack}
  </div>
  </div>`;
      $(".shopmore").append(template);
    }
  }
}

lis.forEach(function (item, index) {
  item.addEventListener("click", function () {
    // window.parent.parent.document.documentElement.scrollTop = 0;
    var load = window.parent.parent.document.querySelector(".loading");
    load.style.display = "block";
    setTimeout(function () {
      load.style.display = "none";
    }, 800);
    window.parent.parent.document.querySelector("body").style.height =
      1600 + "px";
    shopArr = [];
    shopTwo = [];
    var detail = document.querySelectorAll(".detail");
    var title = document.querySelectorAll(".title");
    var li = window.parent.parent.document.querySelectorAll(".leftScroll>li");
    for (let i = 0; i < li.length; i++) {
      li[i].parentNode.removeChild(li[i]);
    }
    for (let i = 0; i < detail.length; i++) {
      detail[i].parentNode.removeChild(detail[i]);
    }
    for (let i = 0; i < title.length; i++) {
      title[i].parentNode.removeChild(title[i]);
    }
    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove("active");
    }
    lis[index].classList.add("active");
    var value = lis[index].innerText;
    for (let i = 0; i < shoplist.length; i++) {
      if (value == shoplist[i].type_one) {
        shopArr.push(shoplist[i]);
        shopTwo.push(shoplist[i].type_two);
      }
    }
    shopTwo = [...new Set(shopTwo)];
    for (let j = 0; j < shopTwo.length; j++) {
      var leftscroll = `<li>${shopTwo[j]}</li>`;
      window.parent.parent.$(".leftScroll").append(leftscroll);
      var temp1 = `
      <div class="title">
      <h2>${shopTwo[j]}</h2>
    </div>`;
      $(".shopmore").append(temp1);
      for (let i = 0; i < shopArr.length; i++) {
        var { type_two, img_list_url, price, mack, title } = shopArr[i];
        if (type_two == shopTwo[j]) {
          var template = `<div class="detail">
    <div>
      <div class="shop">
        <img src="${img_list_url}" alt="" />
      </div>
      <div>
        <h3>${title}</h3>
      </div>
      <div class="info">
        <span class="fl">￥${price}</span>
        ${mack}
      </div>
      </div>`;
          $(".shopmore").append(template);
        }
      }
      var detai = document.querySelectorAll(".detail");
      for (let i = 0; i < detai.length; i++) {
        detai[i].addEventListener("click", function () {
          var linkhref = window.parent.document.querySelector("#bottom");
          linkhref.src = "view/detail.html";
          sessionStorage.setItem("id", shopArr[i].Id);
          sessionStorage.setItem("typeone", shopArr[i].type_one);
        });
      }
      var leftli = window.parent.parent.document.querySelectorAll(
        ".leftScroll>li"
      );
      leftli[0].classList.add("leftactive");
      leftli.forEach(function (item, index) {
        item.addEventListener("click", function () {
          for (let i = 0; i < leftli.length; i++) {
            leftli[i].classList.remove("leftactive");
          }
          leftli[index].classList.add("leftactive");
        });
      });
      var title = document.querySelectorAll(".title");
      for (let i = 0; i < leftli.length; i++) {
        leftli[i].addEventListener("click", function () {
          window.parent.parent.document.documentElement.scrollTop =
            title[i].offsetTop;
        });
      }
      window.parent.parent.onscroll = function () {
        var scrolllength =
          window.parent.parent.document.documentElement.scrollTop;
        var dheight = window.parent.parent.document.body.clientHeight;
        var windowHeight = window.parent.parent.document.querySelector("body");
        if (dheight - scrolllength < 1000 && dheight - scrolllength > 900) {
          windowHeight.style.height =
            parseInt(windowHeight.style.height) + 1000 + "px";
        }

        var h = window.parent.parent.document.documentElement.scrollTop;
        for (let i = 0; i < title.length; i++) {
          var titleTop = title[i].offsetTop;
          if (h >= titleTop - 150) {
            for (let i = 0; i < leftli.length; i++) {
              leftli[i].classList.remove("leftactive");
            }
            leftli[i].classList.add("leftactive");
          }
        }
      };
    }
  });
});

var tabli = document.querySelectorAll(".tabbar>ul>li");
tabli.forEach(function (item, index) {
  item.addEventListener("click", function () {
    for (let i = 0; i < tabli.length; i++) {
      tabli[i].classList.remove("leftactive");
    }
    tabli[index].classList.add("leftactive");
  });
});

var detail = document.querySelectorAll(".detail");
for (let i = 0; i < detail.length; i++) {
  detail[i].addEventListener("click", function () {
    var linkhref = window.parent.document.querySelector("#bottom");
    linkhref.src = "view/detail.html";
    sessionStorage.setItem("id", shopArr[i].Id);
    sessionStorage.setItem("typeone", shopArr[i].type_one);
    window.parent.parent.document.querySelector(".loading").style.display =
      "block";
  });
}
var title = document.querySelectorAll(".title");
var leftli = window.parent.parent.document.querySelectorAll(".leftScroll>li");
leftli[0].classList.add("leftactive");
for (let i = 0; i < leftli.length; i++) {
  leftli[i].addEventListener("click", function () {
    window.parent.parent.document.documentElement.scrollTop =
      title[i].offsetTop;
  });
}
window.parent.parent.onscroll = function () {
  var scrolllength = window.parent.parent.document.documentElement.scrollTop;
  var dheight = window.parent.parent.document.body.clientHeight;
  var windowHeight = window.parent.parent.document.querySelector("body");
  if (dheight - scrolllength < 1000 && dheight - scrolllength > 900) {
    windowHeight.style.height =
      parseInt(windowHeight.style.height) + 1000 + "px";
  }

  var h = window.parent.parent.document.documentElement.scrollTop;
  for (let i = 0; i < title.length; i++) {
    var titleTop = title[i].offsetTop;
    if (h >= titleTop - 150) {
      for (let i = 0; i < leftli.length; i++) {
        leftli[i].classList.remove("leftactive");
      }
      leftli[i].classList.add("leftactive");
    }
  }
};
