const productos = require("../models/productos");
const cotizacion = require("../models/cotizacion");

const agregarItem = async (req, res) => {
  // req.flash("mensajes", [{ msg: error.message }]);
  return res.redirect("/");
};

//HU - 2 Yo como usuario, quiero ver los productos de la pagina con mi cuenta registrada.
// HU - 7 Yo como usuario registrado quiero ver la información del producto, precio y descripción.
const leerProductos = async (req, res) => {
  // console.log(req.user.id);
  try {
    const productosBD = await productos.find().lean();
    const cotiDB = await cotizacion.find().lean();
    const filtroCoti = filtroUser(req.user.id.toHexString(), cotiDB);
    const arrayNomProd = [
      ...new Set(filtroCoti.map((item) => item.nombreProd)),
    ];
    let prodSum = [];
    arrayNomProd.forEach((nombre) => {
      arrayPorNombre = filtroCoti.filter((e) => e.nombreProd == nombre);
      precio = productosBD.filter(
        (e) => e.nombre.toLowerCase() == nombre.toLowerCase()
      )[0].precio;
      suma = 0;
      arrayPorNombre.forEach((e) => (suma += e.cantidadProd));
      prodSum.push({ name: nombre, cantidad: suma, total: suma * precio });
    });
    let totalFinal = 0;
    prodSum.forEach((e) => (totalFinal += e.total));
    // console.log(prodSum, totalFinal);

    return res.render("home", {
      productos: productosBD,
      cotizacion: prodSum,
      total: totalFinal,
    });
  } catch (error) {
    console.log(error);
  }
};

const filtroUser = (userId, cotizaciones) => {
  return cotizaciones.filter((e) => e.userId == userId);
};

const leerCoti = async (req, res) => {
  try {
    const cotiDB = await cotizacion.find().lean();
    // console.log(cotiDB);
    return cotiDB;
  } catch (error) {
    console.log(error);
  }
};

//HU - 3 Yo como usuario ya registrado puede crear nuevo pedido / solicitud de compra.
// HU - 4 Yo como usuario registrado puede leer y listar mis pedidos.

const agregarProd = async (req, res) => {
  console.log(req.user.id);
  try {
    const coti = new cotizacion({
      userId: req.user.id,
      nombreProd: req.body.name,
      cantidadProd: req.body.quantity,
    });
    // HU - 8 Yo como usuario registrado, quiero ir agregando estos productos a un PEDIDO.
    await coti.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send("error algo fallo");
  }
};

//HU - 5 Yo como usuario registrado pueda modificar mis datos del pedido.
const eliminarProd = async (req, res) => {
  try {
    const idUsuario = req.user.id.toHexString();
    const nombreK = req.body.name
    await cotizacion.deleteMany({ iduser: idUsuario, nombreProd: nombreK})    
    return res.redirect("/");
  } catch (error) {
    req.flash("mensajes", [{ msg: error.message }]);
    
  } 
};

//HU - 9 Yo como usuario registrado, quiero finalizar el pedido/compra.
const finalizaCompra = async (req, res) => {
      const idUsuario = req.user.id.toHexString();
      await cotizacion.deleteMany({iduser: idUsuario});
      res.render("compra");
};

module.exports = {
  agregarItem,
  eliminarProd,
  agregarProd,
  leerProductos,
  leerCoti,
  finalizaCompra,
};
