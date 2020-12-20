let id = window.location.search.substr(1);

var request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE) {
    var response = JSON.parse(this.responseText);
    document.getElementById("product").innerHTML +=
      '<div><div class="card mb-4 border-light shadow"><img alt="Ours en peluche" class="card-img-top" src=' +
      response.imageUrl +
      '><div class="card-body" id="card"><div class="text-center"><p class="card-title h3 font-weight-bold">' +
      response.name +
      '</p><p class="card-title h5">' +
      response.description +
      '</p><p class="card-title h5">' +
      response.price / 100 +
      "€" +
      '</p><div class="input-group mt-3"><div class="input-group-prepend"><label class="input-group-text" for=« colorSelect01">Couleur</label></div><select class="custom-select" id="colorSelect"><option selected>Choisissez...</option></select></div></div></div></div></div>';
    for (let i = 0; i < response.colors.length; i++) {
      document.getElementById("colorSelect").innerHTML +=
        "<option value=" + i + ">" + response.colors[i] + "</option>";
    }
  }
};
request.open("GET", "http://localhost:3000/api/teddies/" + id);
request.send();
