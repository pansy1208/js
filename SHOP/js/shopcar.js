var change = sessionStorage.getItem("change");
var lis = document.querySelectorAll(".bar>ul>li");
lis[change].classList.add("active");
var changevalue = lis[change].innerText;
var shoplist = localStorage.getItem("shoplist");
shoplist = JSON.parse(shoplist);
var shopArr = [];
for (let i = 0; i < shoplist.length; i++) {
  if (shoplist[i].type_one == changevalue) {
    shopArr.push(shoplist[i]);
  }
}
for (let i = 0; i < shopArr.length; i++) {
  var { type_two, img_list_url, price, mack, title } = shopArr[i];
  var template = `<div class="detail">
  <div class="title">
  <h2>${type_two}</h2>
</div>
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
lis.forEach(function (item, index) {
  item.addEventListener("click", function () {
    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove("active");
    }
    lis[index].classList.add("active");
    var value = lis[index].innerText;
  });
});

window.parent.parent.onscroll = function () {
  var scrolllength = window.parent.parent.document.documentElement.scrollTop;
  var dheight = window.parent.parent.document.body.clientHeight;
  var windowHeight = window.parent.parent.document.querySelector("body");
  if (dheight - scrolllength < 1000 && dheight - scrolllength > 900) {
    windowHeight.style.height =
      parseInt(windowHeight.style.height) + 1000 + "px";
  }
};
