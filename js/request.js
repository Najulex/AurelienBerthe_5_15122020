/*fonction qui retourne une promesse pour la requète HTTP avec méthode GET*/
function get(url) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        resolve(response);
      }
    };
    request.open("GET", url);
    request.send();
  });
}

/*fonction qui retourne une promesse pour la requète HTTP avec méthode POST*/
function post(url) {
  return new Promise((resolve, reject) => {
    let request2 = new XMLHttpRequest();
    request2.open("POST", url);
    request2.setRequestHeader("Content-Type", "application/json");
    request2.send(order);
    request2.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE) {
        var response2 = JSON.parse(this.responseText);
        resolve(response2);
      }
    };
  });
}
