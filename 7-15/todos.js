function html(el, str) {
  el.innerHTML = str;
  return el;
}

function hide(el) {
  var val = 1;
  el.style.opacity = 1;
  el.timer = setInterval(function () {
    val -= 0.1;
    if (val <= 0) {
      el.style.opacity = 0;
      el.style.display = "none";
      clearInterval(el.timer);
      return;
    }
    el.style.opacity = val;
  }, 50);
  return el;
}

function show(el) {
  var val = 0;
  el.style.display = "block";
  el.style.opacity = val;
  el.timer = setInterval(function () {
    val += 0.1;
    if (val >= 1) {
      el.style.opacity = 1;
      el.style.display = "block";
      clearInterval(el.timer);
      return;
    }
    el.style.opacity = val;
  }, 50);
  return el;
}