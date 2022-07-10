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

  postJsonData(data);
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

async function postJsonData(data) {
  const response = await fetch("/addCoti", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const actualResponse = await response.json();
}
