Api Tienda
Base URL
http://localhost:3000

Endpoints
GET /ping
Verifica que la API está funcionando.

Response 200
{
"message": "pong"
}
GET /products
Devuelve la lista de productos.

Response 200
[
{
"id": 1,
"name": "Laptop",
"price": 1200
}
]
GET /products/:id
Devuelve un producto por id.

Response 200
{
"id": 1,
"name": "Laptop",
"price": 1200
}
Response 404
{
"error": "Producto no encontrado"
}
