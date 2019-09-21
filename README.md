# Nodepop(API)

- Proyecto backend de un API llamada Nodepop como practica, parte del curso de Desarrollo Backend con Node.js del Bootcamp Web 7 de Keepcoding.
- El servicio mantiene anuncios de compra o venta de artículos y permite buscar como poner filtros por varios criterios.
- Este proyecto usa EXPRESS, MongoDB, mongoose y Node.js. Se puede ver las dependencias en `package.json`.

- **Anuncios**: cada anuncio tiene los siguientes datos:
    - Nombre del artículo, un anuncio siempre tendrá un solo artículo
    - Si el artículo se vende o se busca.
    - Precio. Será el precio del artículo en caso de ser una oferta de venta. En caso de que sea un adnuncio de 'se busca' será el precio que el solicitante estaría dispuesto a pagar.
    - *Foto de artículo.* Cada anuncio tendrá solo una foto.
    - *Tags del anuncio.* Podrá tener uno o varios de estos cuatro: work, lifestyle, motor y mobile.

- **Operaciones que ebe realizar el API:**
    - Listar anuncios con posibilidad de paginación. Con filtros por tag, tipo de anuncio(venta o búsqueda), rango de precio(precio min. y precio max.) y nombre de artículo(que empiece por el dato buscado)
    - Lista de tags existentes
    - Creación de anuncios

## Requirements

### MongoDB
Para este proyecto es necesario tener instalado MongoDB. Primero vamos a arrancar un servidor MongoDB local escribiendo la siguiente lìnea en un terminal:

```shell
> ./bin/mongod --dbpath ./data/db --directoryperdb
```

### Instalar dependencias
Un paso importante antes de arrancar el servidor es instalar todas las dependencias del proyecto. Para hacerlo, en un terminal ejecutamos lo siguiente:

```shell
> npm install
```
### Inicializar Base de Datos
En este proceso se crearà y cargará una colección de documentos de la base de datos necesaria para el funcionamiento de la aplicación 'nodepop', para esto ejecutamos el script `installDB` dentro del package.json:
```shell
> npm run installDB
```
### Iniciar App
Hay varias formas de iniciar o arrancar nodepop:
- En modo DEBUG para el desarrollo, ejecutamos en un terminal:
```shell
> npm run dev
```
- En modo Produción, ejecutamos:
```shell
> npm run prod
```

> Puedes conocer mas revisando el apartado `scripts` en el archivo de configuración *package.json*

## API Methods

### Lista de Anuncios

**GET** /apiv1/anuncios
Devuelve una lista de anuncios
[](http://localhost:3000/apiv1/anuncios)

## Ejemplo de peticiones

