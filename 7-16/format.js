Date.prototype.format = function (str) {
  var res = str;
  var time = {
    "Y+": this.getFullYear(),
    "M+": this.getMonth() + 1,
    "D+": this.getDate(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "S+": this.getSeconds(),
  };
  for (const key in time) {
    var reg = new RegExp(`(${key})`);
    if (reg.test(res)) {
      var newVul = time[key] >= 10 ? time[key] : "0" + time[key];
      res = res.replace(RegExp.$1, newVul);
    }
  }
  return res;
};
