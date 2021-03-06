document.addEventListener("click", (e) => {
  if (e.target.dataset.short) {
    const url = `${windows.location.origin}/${e.target.dataset.short}`;

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

$(document).ready(function () {
  $("#instagram").click(function () {
    openInNewTab("http://www.instagram.com");
  });
  $("#whatsapp").click(function () {
    openInNewTab("https://web.whatsapp.com/");
  });
});

function openInNewTab(href) {
  Object.assign(document.createElement("a"), {
    target: "_blank",
    href: href,
  }).click();
}
// Funcionalidad para tooltip y popover
$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="popover"]').popover();

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

$('.delete').click(function (e) { 
  let nombreProducto = this.id
  let data = { name: nombreProducto };

  postData('http://localhost:5000/eliminar', data)
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
  
});