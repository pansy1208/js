window.parent.parent.document.querySelector("body").style.height = 1400 + "px";
setTimeout(function () {
  window.parent.parent.document.querySelector(".loading").style.display =
    "none";
}, 300);
window.parent.parent.document.querySelector(".tabbar").style.display = "none";
setTimeout(function () {
  var bigImgs = document.querySelectorAll(".bigImg>img");
  var smImgs = document.querySelectorAll(".smImg>img");
  var glassImgs = document.querySelectorAll(".glass>img");
  var bigImg = document.querySelector(".bigImg");
  var mark = document.querySelector(".mark");
  var glass = document.querySelector(".glass");
  bigImgs[0].style.display = "block";
  var x = 0;
  smImgs.forEach(function (item, index) {
    item.addEventListener("click", function () {
      x = index;
      for (let i = 0; i < smImgs.length; i++) {
        smImgs[i].classList.remove("active");
      }
      item.classList.add("active");
      for (let j = 0; j < bigImgs.length; j++) {
        bigImgs[j].style.display = "none";
      }
      bigImgs[index].style.display = "block";
    });
  });
  bigImg.addEventListener("mousemove", function (e) {
    mark.style.display = "block";
    glass.style.display = "block";
    for (let i = 0; i < glassImgs.length; i++) {
      glassImgs[i].style.display = "none";
    }
    glassImgs[x].style.display = "block";
    var mouseX = e.pageX - 260;
    var mouseY = e.pageY - this.offsetTop;
    var markX = mouseX - mark.offsetWidth / 2;
    var markY = mouseY - mark.offsetHeight / 2;
    var markMax = this.offsetWidth - mark.offsetWidth;
    if (markX <= 0) {
      markX = 0;
    }
    if (markX >= markMax) {
      markX = markMax;
    }
    if (markY <= 0) {
      markY = 0;
    }
    if (markY >= markMax) {
      markY = markMax;
    }
    mark.style.left = markX + "px";
    mark.style.top = markY + "px";
    var size = glassImgs[x].offsetWidth / this.offsetWidth;
    var stepX = size * markX;
    var stepY = size * markY;
    glassImgs[x].style.right = stepX + "px";
    glassImgs[x].style.bottom = stepY + "px";
  });
  bigImg.addEventListener("mouseleave", function () {
    mark.style.display = "none";
    glass.style.display = "none";
  });
}, 200);
var remArr = [];
var id = sessionStorage.getItem("id");
window.onload = function () {
  $.ajax({
    url: "http://vebcoder.cn:9527/api/detail",
    method: "get",
    dataType: "json",
    data: {
      goodId: id,
    },
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        var { imgs, title, price, supplier } = data[i];
        imgs = JSON.parse(imgs);
        var templateRight = `<div>
        <h2>${title}</h2>
      </div>
      <div>
        <p>${supplier}</p>
      </div>
      <div>
        <p class="price">￥${price}</p>
      </div>
      <div>
            3.7
          </div>
          <button>添加到购物车</button>`;
        $(".handle").append(templateRight);

        var templateLeft = `<div class="bigImg">
          <div class="mark"></div>
        </div>
        <div class="glass">
        </div>
        <div class="smImg">
        </div>`;
        $(".pic").append(templateLeft);

        for (let j = 0; j < imgs.length; j++) {
          var smImgs = document.createElement("img");
          var bigImgs = document.createElement("img");
          var glassImgs = document.createElement("img");
          smImgs.src = imgs[j];
          bigImgs.src = imgs[j];
          glassImgs.src = imgs[j];
          $(".smImg").append(smImgs);
          $(".bigImg").append(bigImgs);
          $(".glass").append(glassImgs);
        }
      }
    },
    error: function (err) {
      console.log(err);
    },
  });

  var type = sessionStorage.getItem("typeone");
  $.ajax({
    url: "http://vebcoder.cn:9527/api/goodList",
    method: "get",
    dataType: "json",
    data: {
      type_one: type,
    },
    success: function (data) {
      var shopdata = [];

      for (let i = 0; i < data.length; i++) {
        if (id != i + 1) {
          shopdata.push(data[i]);
        }
      }
      for (let i = 0; i < 10; i++) {
        var num = Math.floor(Math.random() * shopdata.length);
        var { img_list_url, mack, price, title } = shopdata[num];
        remArr.push(shopdata[num]);
        var template = `<div class="shopbtm">
      <div class="shop">
        <img src="${img_list_url}" alt="" />
      </div>
      <div class="title">
        <h3>${title}</h3>
      </div>
      <div class="info">
        <span class="fl">￥${price}</span>
        ${mack}
      </div>
    </div>`;
        $(".footer-btm").append(template);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
};

var back = document.querySelector(".back");
back.addEventListener("click", function () {
  window.parent.document.querySelector("#bottom").src = "view/home.html";
  window.parent.parent.document.querySelector("body").style.height =
    1600 + "px";
  var tabli = window.parent.parent.document.querySelectorAll(".leftScroll>li");
  for (let i = 0; i < tabli.length; i++) {
    tabli[i].parentNode.removeChild(tabli[i]);
  }
  window.parent.parent.document.querySelector(".tabbar").style.display = "none";
  window.parent.parent.document.querySelector(".loading").style.display =
    "block";
});

setTimeout(function () {
  var shoplist = localStorage.getItem("shoplist");
  shoplist = JSON.parse(shoplist);
  var shopbtm = document.querySelectorAll(".shopbtm");
  for (let i = 0; i < remArr.length; i++) {
    shopbtm[i].addEventListener("click", function () {
      window.parent.document.querySelector("#bottom").src = "view/detail.html";
      sessionStorage.setItem("id", remArr[i].Id);
      sessionStorage.setItem("typeone", remArr[i].type_one);
    });
  }
}, 200);
