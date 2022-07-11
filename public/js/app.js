document.addEventListener("click", (e) => {
  if (e.target.dataset.short) {
    const url = `http://localhost:5000/${e.target.dataset.short}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("Text copied to clipboard...");
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }
});

$(".btnCoti").click(function () {
  let nombreProducto = $(this).val();
  let cantidadProductos = document.getElementById(
    "Cantidad-" + nombreProducto
  ).value;
  let data = { name: nombreProducto, quantity: cantidadProductos };

  postData('http://localhost:5000/addCoti', data)
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
});

$("#modalBtn").click(function (e) {
  let verduras = JSON.parse(localStorage.getItem("verduras"));
  let htmlBody = "";
  verduras.productos.forEach((element) => {
    htmlBody += `<img src="/assets/img/${element}.png" class="card-img-top" alt="...">`;
  });
  $("#modalBody").html(htmlBody);
});

$(document).ready(function () {
  $("#facebook").click(function () {
    openInNewTab("http://www.facebook.com");
  });
  $("#github").click(function () {
    openInNewTab("http://www.github.com");
  });
  $("#twitter").click(function () {
    openInNewTab("http://www.twitter.com");
  });
  $("#linkedin").click(function () {
    openInNewTab("http://www.linkedin.com");
  });
});

function openInNewTab(href) {
  Object.assign(document.createElement("a"), {
    target: "_blank",
    href: href,
  }).click();
}

// Example POST method implementation:
async function postData(url = '', data = {}) {
  console.log(data);
  console.log(JSON.stringify(data));
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}