$(document).ready(function() {
    console.log("JQuery cargado y listo");

    // Lógica para la barra de búsqueda expandible
    const searchBtn = document.getElementById('searchBtn');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    if(searchBtn && searchForm && searchInput) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Evitar envío del formulario si no hay texto
            
            // Si ya está expandido y tiene texto, aquí se podría enviar el formulario
            // if (searchForm.classList.contains('search-expanded') && searchInput.value.trim() !== "") {
            //     searchForm.submit();
            // }

            // Alternar clase para expandir/contraer
            searchForm.classList.toggle('search-expanded');
            
            // Si se expande, poner foco
            if (searchForm.classList.contains('search-expanded')) {
                searchInput.focus();
            }
        });

        // Cerrar si se hace clic fuera
        document.addEventListener('click', function(event) {
            if (!searchForm.contains(event.target) && searchForm.classList.contains('search-expanded')) {
                // Solo cerrar si el input está vacío
                if(searchInput.value.trim() === "") {
                    searchForm.classList.remove('search-expanded');
                }
            }
        });
    }

    // Variable para almacenar favoritos en memoria
    let favorites = [];

    //  Detectar clic en el botón de favoritos (delegación de eventos)
    $('.btn-fav').on('click', function() {
        //  Manipulación del DOM para encontrar el producto padre
        const card = $(this).closest('.product-card');
        const productId = card.data('id');
        const productTitle = card.find('.card-title').text();
        const productImg = card.find('img').attr('src');
        const productPrice = card.find('.card-text').text();

        // Verificar si ya es favorito revisando la clase CSS
        if ($(this).hasClass('fav-active')) {
            // --- REMOVER DE FAVORITOS ---
            
            // Cambiar icono a gris (vacío)
            $(this).removeClass('fav-active bi-heart-fill text-danger');
            $(this).addClass('bi-heart text-secondary');

            // Eliminar del array
            favorites = favorites.filter(p => p.id !== productId);

            //  Mensaje dinámico
            mostrarToast(`"${productTitle}" eliminado de favoritos.`);

        } else {
            // --- AGREGAR A FAVORITOS ---

            // Cambiar icono a rojo (lleno)
            $(this).removeClass('bi-heart text-secondary');
            $(this).addClass('fav-active bi-heart-fill text-danger');

            // Agregar al array
            favorites.push({
                id: productId,
                title: productTitle,
                img: productImg,
                price: productPrice
            });

            //  Mensaje dinámico
            mostrarToast(`"${productTitle}" añadido a favoritos.`);
        }

        // Actualizar la interfaz del Navbar
        actualizarNavbarFavorites();
    });

    // Función para actualizar el menú desplegable del Navbar
    function actualizarNavbarFavorites() {
        const $favList = $('#fav-list');
        const $favCount = $('#fav-count');

        // Limpiar lista actual
        $favList.empty();

        // Actualizar contador
        if (favorites.length > 0) {
            $favCount.text(favorites.length).show();
            
            // Generar HTML de la lista tipo "miniaturas"
            favorites.forEach(prod => {
                const itemHtml = `
                    <li class="d-flex align-items-center mb-2 border-bottom pb-2">
                        <img src="${prod.img}" class="fav-thumbnail" alt="${prod.title}">
                        <div class="d-flex flex-column">
                            <span class="fw-bold" style="font-size: 0.9rem;">${prod.title}</span>
                            <span class="text-muted" style="font-size: 0.8rem;">${prod.price}</span>
                        </div>
                    </li>
                `;
                $favList.append(itemHtml);
            });
        } else {
            $favCount.hide();
            $favList.html('<li class="text-center text-muted">No tienes favoritos aún.</li>');
        }
    }

    // Función auxiliar para mostrar el Toast de Bootstrap
    function mostrarToast(mensaje) {
        $('#toast-message').text(mensaje);
        const toastEl = document.getElementById('favToast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
});