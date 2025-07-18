document.addEventListener("DOMContentLoaded", () => {   /*acceder al objeto document y agregamos un evento */
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];    /*Convertimos el json a javascript y si el carrito es devuelve null generamos un  */
    
    const renderizarProductos = () => {
        url = "https://dummyjson.com/products";


        fetch(url)
            .then((response) => response.json())
            .then(data => {
                let contenedorProductos = document.getElementById(
                    "contenedor-productos"
                );
                
                for(const producto of data.products){
                    let tarjetaProducto = document.createElement("article");
                    tarjetaProducto.classList.add("tarjeta-producto");

                    let imagenProducto = document.createElement("img");
                    imagenProducto.src = producto.images[0];
                    imagenProducto.alt = producto.description;

                    let tituloProducto = document.createElement("h3");
                    tituloProducto.classList.add("titulo-producto");
                    tituloProducto.textContent = producto.title;

                    let precioProducto = document.createElement("p");
                    precioProducto.textContent = `$${producto.price}`;

                    let btnAgregar = document.createElement("button");
                    btnAgregar.textContent = "Agregar";

                    btnAgregar.addEventListener("click", () =>{
                        alert(`${producto.title} agragado al carrito`);
                        agregarProducto(producto);
                        actualizarAgregados();
                    });

                    tarjetaProducto.appendChild(imagenProducto);
                    tarjetaProducto.appendChild(tituloProducto);
                    tarjetaProducto.appendChild(precioProducto);
                    tarjetaProducto.appendChild(btnAgregar);

                    contenedorProductos.appendChild(tarjetaProducto);
                }
            })
            .catch((err) => console.error("Error: ", err));
    };

    const agregarProducto = (producto) => {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    const actualizarAgregados = () => {
        const contadorCarrito = document.getElementsById("contador-carrito");
        contadorCarrito.textContent = carrito.length;
    };

    renderizarProductos();
    actualizarAgregados();

});