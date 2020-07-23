function ajax(option) {
  var xhr = new XMLHttpRequest();
  var { method, url, async, success, error, data } = option;
  if (method === "get" || method === "GET") {
    var url = url + "?";
    for (const x in data) {
      url += `${x}=${data[x]}&`;
    }
    url = url.slice(0, url.length - 1);
    xhr.open(method, url, async);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.status === "200" && xhr.readyState === "4") {
        var res = xhr.response;
        success(res);
      } else {
        error(xhr);
      }
    };
  }
  if (method === "post" || method === "POST") {
    var params = "";
    for (const x in data) {
      params += `${x}=${data[x]}&`;
    }
    params = params.slice(0, params.length - 1);
    xhr.open(method, url, async);
    xhr.send(params);

    xhr.onreadystatechange = function () {
      if (xhr.status === "200" && xhr.readyState === "4") {
        var res = xhr.response;
        success(res);
      } else {
        error(xhr);
      }
    };
  }
}
