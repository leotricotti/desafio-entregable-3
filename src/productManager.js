import utils from "./utils.js";
import fs from "fs";

class ProductManager {
  // Constructor de la clase
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  // Metodo asyncrono para agregar un producto y validar que los datos sean correctos
  async addProduct(title, description, price, thumbnail, code, stock) {
    // Validar que todos los datos estén presentes
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      // Si falta algún dato, lanzar un error
      throw new Error(
        "Todos los datos son obligatorios. Por favor, complete todos los campos."
      );
    }
    try {
      // Leer el archivo JSON existente
      let data = await utils.readFile(this.path);
      this.products = data ? JSON.parse(data) : [];
    } catch (error) {
      // Manejar el error
      console.log(error);
    }

    // Obtener el último id del array de productos
    const lastId = this.products.reduce((max, product) => {
      return product.id > max ? product.id : max;
    }, 0);

    // Generar un nuevo id autoincremental
    const newId = lastId + 1;

    // Verificar si el código ya existe en algún producto existente
    const codeExist = this.products.find((product) => product.code === code);

    if (codeExist) {
      throw new Error(
        // Si el código ya existe, lanzar un error
        `El código ${code} ya está en uso. Por favor, elija un código único.`
      );
    } else {
      // Si todo está bien, crear el producto y agregarlo al array
      const product = {
        id: newId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      // Agregar el producto al array
      this.products.push(product);
      try {
        // Escribir el archivo JSON actualizado
        await utils.writeFile(this.path, this.products);
        return true;
      } catch (err) {
        // Manejar el error
        console.log(err);
      }
    }
  }

  // Método asyncrono para obtener todos los productos
  async getProducts() {
    try {
      // Obtener los productos del archivo
      let data = await utils.readFile(this.path);
      this.products = data.length > 0 ? data : [];
      // Devolver los productos
      return this.products;
    } catch (err) {
      // Manejar el error
      console.log(err);
    }
  }

  // Método asyncrono para obtener un producto por id
  async getProductById(id) {
    try {
      // Leer el archivo JSON
      let data = await utils.readFile(this.path);
      this.products = data?.length > 0 ? data : [];
      // Buscar el producto por su id en el array de productos
      let product = this.products.find((dato) => dato.id === id);
      // Devolver el producto encontrado
      return product;
    } catch (error) {
      // Manejar el error
      console.log(error);
    }
  }

  // Metodo asyncrono para actualizar un producto
  async updateProductById(id, data) {
    try {
      // Leer el archivo JSON
      let products = await utils.readFile(this.path);
      this.products = products?.length > 0 ? JSON.parse(products) : [];

      // Encontrar el índice del producto en el array de productos
      let productIndex = this.products.findIndex((dato) => dato.id === id);
      if (productIndex !== -1) {
        // Actualizar los datos del producto
        this.products[productIndex] = {
          ...this.products[productIndex],
          ...data,
        };
        // Escribir los productos actualizados en el archivo JSON
        await utils.writeFile(this.path, this.products);
        return {
          mensaje: "Producto modificado con éxito",
          producto: this.products[productIndex],
        };
      } else {
        return { mensaje: "El producto solicitado no existe" };
      }
    } catch (error) {
      // Manejar el error
      console.log(error);
    }
  }

  //Metodo asyncrono para eliminar un producto
  async deleteProductById(id) {
    try {
      // Leer el archivo JSON
      let products = await utils.readFile(this.path);
      this.products = products?.length > 0 ? JSON.parse(products) : [];
      // Encontrar el índice del producto en el array de productos
      let productIndex = this.products.findIndex((dato) => dato.id === id);
      // Si se encuentra el producto, eliminarlo del array
      if (productIndex !== -1) {
        let product = this.products[productIndex];
        this.products.splice(productIndex, 1);
        await utils.writeFile(this.path, this.products);
        // Devolver el producto eliminado
        return { mensaje: "Producto eliminado con éxito", producto: product };
      } else {
        // Si no se encuentra el producto, devolver un mensaje indicando que no existe
        return { mensaje: "Producto inexistente" };
      }
    } catch (error) {
      // Manejar el error
      console.log(error);
    }
  }
}

export default ProductManager;
