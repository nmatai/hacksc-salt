var XMLHttpRequest = require('xhr2');

var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://192.168.222.118:5001/analyze", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
      }
    };
    var data = JSON.stringify({ text: "h" });
    xhr.send(data);