# Servidor de productos

Este es un servidor web básico que utiliza el framework Express.js para manejar solicitudes HTTP. El servidor tiene dos rutas:

1. `/productos`: Esta ruta maneja solicitudes GET y devuelve una lista de productos. Si se proporciona un parámetro `limit` en la consulta, la ruta devuelve solo los primeros `limit` productos.

2. `/productos/:pid`: Esta ruta maneja solicitudes GET y devuelve un producto específico según el ID proporcionado en la URL.

El servidor utiliza una instancia de la clase `ProductManager` para obtener los datos de los productos. La clase `ProductManager` se define en el archivo `productManager.js` y se utiliza para leer y escribir datos de productos en un archivo JSON.

## Requisitos previos

Antes de ejecutar este servidor, asegúrate de tener instalado Node.js en tu sistema. Puedes descargar Node.js desde el sitio web oficial:

https://nodejs.org/

## Instalación

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en el directorio raíz del repositorio.
3. Ejecuta el siguiente comando para instalar las dependencias del servidor:

```
npm install
```

## Uso

1. Abre una terminal en el directorio raíz del repositorio.
2. Ejecuta el siguiente comando para iniciar el servidor:

```
npm start
```

3. Abre un navegador web y navega a la siguiente URL para obtener la lista completa de productos:

```
http://localhost:8080/productos
```

4. Si deseas obtener solo los primeros `n` productos, agrega el parámetro `limit` a la URL:

```
http://localhost:8080/productos?limit=n
```

5. Para obtener un producto específico, navega a la siguiente URL, reemplazando `pid` con el ID del producto que deseas obtener:

```
http://localhost:8080/productos/pid
```

## Contribución

Si deseas contribuir a este proyecto, por favor crea un fork del repositorio y envía tus cambios a través de un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más información.

Espero que esto te ayude a escribir un archivo README para este servidor. Si tienes alguna otra pregunta, no dudes en preguntar.
