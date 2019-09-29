# Nodepop(API)

![imagen del home de nodepop](nodepop/public/images/Documentación/home_site.png?raw=true "home site nodepop")

## Introduction
- Proyecto backend del API de la app Nodepop, creada como practica parte del curso de Desarrollo Backend con Node.js del Bootcamp Web 7 de Keepcoding.
- El servicio mantiene anuncios de compra o venta de artículos y permite consultar,  y buscar filtros por varios criterios.
- Además puedes visitar un site con los anuncios en la base de datos de nodepop después de iniciar la app ingresando al url [http://localhost:3000/](http://localhost:3000/).

## Overview

- **Tecnologías:** Este proyecto usa EXPRESS, MongoDB, mongoose y Node.js. Se puede conocer las dependencias en `package.json`.

- El Api de nodepop esta basada en principios REST y usa los métodos HTTP(GET y POST) para acceder a los recursos. 

- El formato de transferencia soportado por el API para enviar y recibir respuestas es en JSON.

- Como alternativa a esta se puede revisar la documentacion en línea [aquí](https://documenter.getpostman.com/view/3162339/SVn3sFCr).

### MongoDB
Para este proyecto es necesario tener instalado MongoDB. Primero vamos a arrancar un servidor MongoDB local escribiendo la siguiente lìnea en un terminal:

```shell
> ./bin/mongod --dbpath ./data/db --directoryperdb
```

### Instalación de dependencias
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

## Autenticación
Todavía no cuenta con autenticación.

## Codigos de Error
¿Que error y códigos de estado puede esperar un usuario?

El API devuelve un json, el cual cuenta con una propiedad booleana `success`, la cual estará en `true` cuando la respuesta se ha resuelto satisfactoriamente, y `false` cuando hubo algún error en la petición.

```json
{
 "success": true,
 "result": []
}
```

## Solicitudes límite
Al estar en desarrollo actualmente no hay límite en la cantidad de solicitudes.



# API Methods

## Recursos 
Los recursos son todos los métodos, y filtros aplicados o disponibles para un endpoint en este caso el endpoint  `/anuncios`:
- `/anuncios/` - obtener todos los anuncios de nodepop.
- `/anuncios/:id` - obtener un anuncio específico.
- `/anuncios/tags` - obtener una lista con los tags existentes.

## Endpoint `/anuncios`

El endpoint **/anuncios** en nuestra API nos permite consultar, paginar, y filtrar datos de todos los anuncios registrados en la base de datos MongoDB de nuestra aplicación `Nodepop`.

## [GET] Lista de Anuncios

### Definición
`http://localhost:3000/apiv1/anuncios`

**GET** /apiv1/anuncios

### Resultado del ejemplo

```JSON
{
    "success": true,
    "anuncios": [
        {
            "tags": [
                "lifestyle",
                "motor"
            ],
            "_id": "5d84855afcc9025b29f6d3b8",
            "nombre": "Bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "bici.jpg",
            "__v": 0
        },
        {
            "tags": [
                "lifestyle",
                "mobile"
            ],
            "_id": "5d84855afcc9025b29f6d3b9",
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "iphone.png",
            "__v": 0
        },
        {
            "tags": [
                "work",
                "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3ba",
            "nombre": "Teclado",
            "venta": true,
            "precio": 65,
            "foto": "teclado.png",
            "__v": 0
        },
        {
            "tags": [
                "work",
                "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bb",
            "nombre": "Mouse",
            "venta": false,
            "precio": 29,
            "foto": "mouse.png",
            "__v": 0
        }
    ]
}
```

Recurso del endpoint /anuncios que retorna una lista de todos anuncios.

## [GET] Lista de Anuncios Paginados, filtros y campos de búsqueda

### Definición
`http://localhost:3000/apiv1/anuncios?start=:skip&limit=:limit&fields=:campo1 :campo2 :campoN&sort=:campo1 :campoN`

### Parametros

#### Query Params
- **start** : _`integer`_ Desde que anuncio se quiere consultar
- limit : _`integer`_ Cantidad de anuncios a partir del inicio que desea retornar.
- **fields** : _`string`_ Campos que se quiere seleccionar aparezcan en la consulta.
- **sort** : _`string`_ Campos por los que se quiere ordenar. Ordena de forma ascendente por defecto.
  - Descendente: En caso de querer ordenar de forma descendente se agrega el signo menos (-) antes del campo por el que se quiere ordenar como por ejemplo `precio` .
- **filter** : _`string`_ Criterios de búsqueda por campos:
  - tags = deben estar entre estas opciones [work, lifestyle, motor, mobile]
  - venta = puede ser [true o false]
  - precio =  _`numeric`_ Rango de precios, el primer rango (rango inicial) siempre debe ser menor que el segundo rango.
    - 10-50 : busca precio entre estos valores pasados.
    - 10- : busca valores que tengan precio > (mayor) a este valor pasado.
    - -50 : busca valores que tengan precio < (menor) a este valor pasado.
    - 30 : busca valores que tengan el precio = (igual) a este valor pasado.
  
#### Campos de búsqueda
  - nombre = _`string`_ Busca en el nombre de los anuncios que empiecen con la cadena que se pase en este parámetro de búsqueda.

**GET** /apiv1/anuncios
Devuelve un listado de anuncios de acuerdo a los parámetros ya sea de filtro, ordenación, selección o búsqueda que se agregue al URL.

### Ejemplos de peticiones

#### Ejemplo 1: petición seleccionando campos y paginado
[http://localhost:3000/apiv1/anuncios?start=0&limit=2&fields=nombre precio](http://localhost:3000/apiv1/anuncios?start=0&limit=2&fields=nombre%20precio)

##### Resultado del Ejemplo 1

```json
{
    "success": true,
    "results": [
        {
            "_id": "5d84855afcc9025b29f6d3b8",
            "nombre": "Bicicleta",
            "precio": 230.15
        },
        {
            "_id": "5d84855afcc9025b29f6d3b9",
            "nombre": "iPhone 3GS",
            "precio": 50
        }
    ]
}
```

#### Ejemplo 2: petición seleccionando campo y omitiendo id
[http://localhost:3000/apiv1/anuncios?start=0&limit=2&fields=nombre precio -_id](http://localhost:3000/apiv1/anuncios?start=0&limit=2&fields=nombre%20precio%20-_id)

#### Resultado del Ejemplo 2
```json
{
    "success": true,
    "results": [
        {
            "nombre": "Bicicleta",
            "precio": 230.15
        },
        {
            "nombre": "iPhone 3GS",
            "precio": 50
        }
    ]
}
```
#### Ejemplo 3: petición ordenando por campos
[http://localhost:3000/apiv1/anuncios?start=0&limit=2&sort= precio](http://localhost:3000/apiv1/anuncios?start=0&limit=2&sort=precio)

#### Resultado del Ejemplo 3
```json
{
    "success": true,
    "results": [
        {
            "tags": [
            "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bd",
            "nombre": "Cubo rubik",
            "venta": true,
            "precio": 15,
            "foto": "cubo_rubik.jpg",
            "__v": 0
        },
        {
            "tags": [
            "work",
            "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bb",
            "nombre": "Mouse",
            "venta": false,
            "precio": 29,
            "foto": "mouse.png",
            "__v": 0
        }
    ]
}
```

#### Ejemplo 4: petición filtro por tipo de anuncio
[http://localhost:3000/apiv1/anuncios?venta=true](http://localhost:3000/apiv1/anuncios?venta=true)

#### Resultado del Ejemplo 4
```json
{
    "success": true,
    "results": [
        {
            "tags": [
                "lifestyle",
                "mobile"
            ],
            "_id": "5d84855afcc9025b29f6d3b9",
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "iphone.png",
            "__v": 0
        },
        {
            "tags": [
                "work",
                "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bb",
            "nombre": "Mouse",
            "venta": false,
            "precio": 29,
            "foto": "mouse.png",
            "__v": 0
        },
        {
            "tags": [
                "work",
                "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bf",
            "nombre": "Mochila",
            "venta": false,
            "precio": 40,
            "foto": "mochila.png",
            "__v": 0
        }
    ]
}
```
#### Ejemplo 5: Petición filtro por tags
[http://localhost:3000/apiv1/anuncios?tags=mobile motor](http://localhost:3000/apiv1/anuncios?tags=mobile%20motor)

#### Resultado del Ejemplo 5
```json
{
    "success": true,
    "results": [
        {
            "tags": [
                "lifestyle",
                "mobile"
            ],
            "_id": "5d84855afcc9025b29f6d3b9",
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "iphone.png",
            "__v": 0
        },
        {
            "tags": [
                "mobile",
                "lifestyle" 
            ],
            "_id": "5d84855afcc9025b29f6d3be",
            "nombre": "Smartwatch",
            "venta": true,
            "precio": 40,
            "foto": "smartwatch.png",
            "__v": 0
        },
        {
            "tags": [
                "lifestyle",
                "motor"
            ],
            "_id": "5d84855afcc9025b29f6d3b8",
            "nombre": "Bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "bici.jpg",
            "__v": 0
        }
    ]
}
```
En esta petición listamos todos los anuncios cuyo campo tags contengan `mobile` y `motor`.

#### Ejemplo 6: Petición filtro por rango de precio
[http://localhost:3000/apiv1/anuncios?precio=10-30](http://localhost:3000/apiv1/anuncios?precio=10-30)

#### Resultado del Ejemplo 6
```json
{
    "success": true,
    "results": [
        {
            "tags": [
                "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bd",
            "nombre": "Cubo rubik",
            "venta": true,
            "precio": 15,
            "foto": "cubo_rubik.jpg",
            "__v": 0
        },
        {
            "tags": [
                "work",
                "lifestyle"
            ],
            "_id": "5d84855afcc9025b29f6d3bb",
            "nombre": "Mouse",
            "venta": false,
            "precio": 29,
            "foto": "mouse.png",
            "__v": 0
        }
    ]
}
```

La petición del ejemplo 6 nos devuelve los anuncios cuyo rango de precio este entre >= a 10 y <= a 30.


Hay que tener en cuenta que el valor del rango inicial siempre debe ser menor al rango final, en caso de ser mayor devolvera un error 422.

[http://localhost:3000/apiv1/anuncios?precio=30-10](http://localhost:3000/apiv1/anuncios?precio=30-10)

#### Resultado de Error en Ejemplo 6
```json
{
    "success": false,
    "error": "El primero parámetro del rango de precio debe ser menor"
}
```

## [GET] Consultar un Anuncio

### Definición

http://localhost:3000/apiv1/anuncios/:id

### Parametros

#### Path Params

- id: **integer** Id del anuncio que desea consultar.

### Ejemplo de peticiones
[http://localhost:3000/apiv1/anuncios/5d84855afcc9025b29f6d3ba](http://localhost:3000/apiv1/anuncios/5d84855afcc9025b29f6d3ba)

### Resultado del ejemplo

```json
{
    "success": true,
    "result": {
        "tags": [
            "work",
            "lifestyle"
        ],
        "_id": "5d84855afcc9025b29f6d3ba",
        "nombre": "Teclado",
        "venta": true,
        "precio": 65,
        "foto": "teclado.png",
        "__v": 0
    }
}
```

## [GET] Lista de Tags

### Definición
`http://localhost:3000/apiv1/anuncios/tags`

**GET** /apiv1/anuncios/tags

### Resultado del ejemplo

```json
{
    "success": true,
    "results": [
        "lifestyle",
        "mobile",
        "motor",
        "work"
    ]
}
```
Recurso del endpoint /anuncios/tags que retorna una lista con los tags existentes.


# Site

Podemos ver el site en el [home](http://localhost:3000/). Aqui se listaran todos los anuncios registrados en la base de datos de la app NodePop.

Además, este site cuenta con filtros en la URL:

## Ejemplo 1 - Filtro por tags

[http://localhost:3000/?star=1&limit=3&sort=nombre&tags=work](http://localhost:3000/?star=1&limit=3&sort=nombre&tags=work)

Este filtro nos devuelve, desde el anuncio 1, limitando a 3 resultados y ordenados por el nombre, los anuncios que contengan el tag `work`.

## Ejemplo 2 - Filtro por tipo de anuncio

[http://localhost:3000/?star=1&limit=3&sort=nombre&venta=true](http://localhost:3000/?star=1&limit=3&sort=nombre&venta=true)

En este ejemplo se obtiene como resultado los anuncios que el venta venta sea `true` es de decir de tipo en venta. En caso de querer los anuncios de tipo compra. el parametro venta deberìa ser `false`.