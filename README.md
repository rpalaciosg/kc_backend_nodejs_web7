# Nodepop(API)

- Proyecto backend de una API llamada Nodepop como practica, parte del curso de Desarrollo Backend con Node.js del Bootcampo Web 7 de Keepcoding.

- Este proyecto es el backend de un API es creada con EXPRESS, MongoDB y Node.js.

- El servicio mantiene anuncios de compra o venta de artículos y permite buscar como poner filtros por varios criterios.

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

## Dependencias

## Empezar a usar

## Ejemplo de peticiones
