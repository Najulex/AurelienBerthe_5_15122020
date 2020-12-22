/*fonction qui retourne une promesse pour la requète HTTP avec méthode GET*/
function get(url) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(this.responseText);
        resolve(response);
      }
    };
    request.open("GET", url);
    request.send();
  });
}
