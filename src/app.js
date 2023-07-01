import express from "express";
import ProductManager from "./productManager.js";

// Crea una instancia de la clase ProductManager y especifica la ubicación del archivo JSON de productos
const productManager = new ProductManager("/productos.json");

// Crea una instancia de la aplicación Express
const app = express();

// Especifica el puerto en el que se ejecutará el servidor
const PORT = 8080;

// Mensaje de bienvenida
app.get("/", (req, res) => {
  res.send("Servidor express en funcionamiento");
});

// Maneja solicitudes GET a la ruta /productos
app.get("/productos", async (req, res) => {
  const { limit } = req.query;
  try {
    // Obtiene la lista completa de productos utilizando la instancia de ProductManager
    let response = await productManager.getProducts();

    // Si se proporciona un parámetro limit en la consulta, devuelve solo los produntos especificados
    if (limit) {
      let tempArray = response.slice(0, limit);
      res.json({ data: tempArray, limit: limit, quantity: tempArray.length });
    } else {
      // Si no se proporciona un parámetro limit, devuelve la lista completa de productos
      res.json({ data: response, limit: false, quantity: response.length });
    }
  } catch (err) {
    // Maneja el error
    console.log(err);
  }
});

// Maneja solicitudes GET a la ruta /productos/:pid
app.get("/productos/:pid", async (req, res) => {
  const { pid } = req.params;

  // Obtiene un producto específico utilizando la instancia de ProductManager y el ID proporcionado en la URL
  let product = await productManager.getProductById(parseInt(pid));

  // Si se encuentra el producto, devuelve un mensaje de éxito y los datos del producto
  if (product) {
    res.json({ data: product, message: "Operación realizada con exito" });
  } else {
    // Si no se encuentra el producto, devuelve un mensaje de error
    res.json({
      message: "Producto no encontrado",
    });
  }
});

// Inicia el servidor en el puerto especificado y registra un mensaje en la consola
app.listen(PORT, () => {
  console.log("Servidor escuchando peticiones desde el puerto " + PORT);
});
