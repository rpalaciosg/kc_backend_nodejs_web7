# Nodepop(API)

- Proyecto backend del API de la app Nodepop, creada como practica parte del curso de Desarrollo Backend con Node.js del Bootcamp Web 7 de Keepcoding.
- El servicio mantiene anuncios de compra o venta de artículos y permite consultar,  y buscar filtros por varios criterios.

## Requerimientos
- **Tecnologías:** Este proyecto usa EXPRESS, MongoDB, mongoose y Node.js. Se puede conocer las dependencias en `package.json`.

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

# API Methods

- El Api de nodepop esta basada en principios REST y usa los métodos HTTP(GET y POST) para acceder a los recursos. 
- El formato de trasnferencia soportado por el API para enviar y recibir respuestas es en JSON.

```json
{
 "success": true,
 "result": []
}
```
Además el json a recibir, nos devolverá una propiedad success, la cual estará en `true` cuando la respuesta se ha resuelto satisfactoriamente, y `false` cuando hubo algún error en la petición.

## Endpoint `/anuncios`

El endpoint **/anuncios** en nuestra API nos permitirá  consultar, paginar, y filtrar datos de todos los anuncios registrados en la base de datos MongoDB de nuestra aplicación `Nodepop`.

## Recursos 
Los recursos son todos los métodos, y filtros aplicados o disponibles para un endpoint en este caso el de `/anuncios`:
- `/anuncios/` - obtener todos los anuncios de nodepop.
- `/anuncios/:id` - obtener un anuncio específico.

### [GET] Lista de Anuncios

#### Definición
`http://localhost:3000/apiv1/anuncios`



**GET** /apiv1/anuncios

#### Resultado del ejemplo

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

### [GET] Lista de Anuncios Paginados y con filtros

#### Definición
`http://localhost:3000/apiv1/anuncios?start=:skip&limit=:limit&fields=:campo1 :campo2 :campoN&sort=:campo1 :campoN`

#### Parametros

##### Query Params
- start : **integer** Desde que anuncio se quiere consultar
- limit : **integer** Cantidad de anuncios a partir del inicio que desea retornar.
- fields : **string** Campos que se quiere seleccionar aparezcan en la consulta.
- sort : **string** Campos por los que se quiere ordenar. Ordena de forma ascendente por defecto.
  - Descendente: En caso de querer ordenar de forma descendente se agrega el signo menos (-) antes del campo por el que se quiere ordenar como por ejemplo `-precio`.
- filter : **string** Criterios de búsqueda por campos:
  - tags = deben estar entre estas opciones [work, lifestyle, motor, mobile]
  - venta = puede ser [true o false]

**GET** /apiv1/anuncios
Devuelve un listado de anuncios de acuerdo al parámetro start y limit que se le pase en la URL, en este caso mostrara desde el objetos 2 y el lìmite a mostrar es de 2 objetos.

#### Ejemplos de peticiones

##### Ejemplo 1: petición seleccionando campos y paginado
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

##### Ejemplo 2: petición seleccionando campo y omitiendo id
[http://localhost:3000/apiv1/anuncios?start=0&limit=2&fields=nombre precio -_id](http://localhost:3000/apiv1/anuncios?start=0&limit=2&fields=nombre%20precio%20-_id)

##### Resultado del Ejemplo 2
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
##### Ejemplo 3: petición ordenando por campos
[http://localhost:3000/apiv1/anuncios?start=0&limit=2&sort= precio](http://localhost:3000/apiv1/anuncios?start=0&limit=2&sort=precio)

##### Resultado del Ejemplo 3
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

##### Ejemplo 4: petición filtro por tipo de anuncio
[http://localhost:3000/apiv1/anuncios?venta=true](http://localhost:3000/apiv1/anuncios?venta=true)

##### Resultado del Ejemplo 4
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

### [GET] Consultar un Anuncios

#### Definición

http://localhost:3000/apiv1/anuncios/:id

#### Parametros

##### Path Params

- id: **integer** Id del anuncio que desea consultar.

#### Ejemplo de peticiones
[http://localhost:3000/apiv1/anuncios/5d84855afcc9025b29f6d3ba](http://localhost:3000/apiv1/anuncios/5d84855afcc9025b29f6d3ba)

#### Resultado del ejemplo

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