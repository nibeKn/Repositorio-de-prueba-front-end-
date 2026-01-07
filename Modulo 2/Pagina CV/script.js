$(document).ready(function() {
    // ==========================================================================
    // Cambiar entre tema claro y oscuro
    // ==========================================================================
    $('#theme-toggle').click(function() {
        $('body').toggleClass('dark-theme');
        
        // Cambiar el icono del botón
        if ($('body').hasClass('dark-theme')) {
            $(this).html('<i class="fas fa-sun"></i>');
        } else {
            $(this).html('<i class="fas fa-moon"></i>');
        }
    });

    // ==========================================================================
    // Efecto de animación al desplazarse
    // ==========================================================================
    function checkVisibility() {
        $('.fade-in').each(function() {
            var $this = $(this);
            var position = $this.offset().top;
            var windowHeight = $(window).height();
            var scroll = $(window).scrollTop();

            // Si la sección está visible en la ventana
            if (position < scroll + windowHeight - 100) {
                $this.addClass('visible');
            }
        });
    }

    // Comprobar la visibilidad al cargar la página y al hacer scroll
    checkVisibility();
    $(window).scroll(function() {
        checkVisibility();
    });

    // ==========================================================================
    // Validación del formulario de contacto en tiempo real
    // ==========================================================================
    $('#contact-form input, #contact-form textarea').on('input', function() {
        var $this = $(this);
        var $formGroup = $this.closest('.mb-3');
        var $invalidFeedback = $formGroup.find('.invalid-feedback');

        // Validación básica: comprobar si el campo está vacío
        if ($this.val().trim() === '') {
            $this.addClass('is-invalid');
            $invalidFeedback.show();
        } else {
            // Validación adicional para el campo de email
            if ($this.attr('type') === 'email') {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test($this.val())) {
                    $this.addClass('is-invalid');
                    $invalidFeedback.text('Por favor, introduce un email válido.').show();
                } else {
                    $this.removeClass('is-invalid');
                    $invalidFeedback.hide();
                }
            } else {
                $this.removeClass('is-invalid');
                $invalidFeedback.hide();
            }
        }
    });

    // Validación al enviar el formulario
    $('#contact-form').submit(function(event) {
        var isValid = true;

        // Comprobar todos los campos antes de enviar
        $(this).find('input, textarea').each(function() {
            var $this = $(this);
            var $formGroup = $this.closest('.mb-3');
            var $invalidFeedback = $formGroup.find('.invalid-feedback');

            if ($this.val().trim() === '') {
                $this.addClass('is-invalid');
                $invalidFeedback.show();
                isValid = false;
            } else if ($this.attr('type') === 'email') {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test($this.val())) {
                    $this.addClass('is-invalid');
                    $invalidFeedback.text('Por favor, introduce un email válido.').show();
                    isValid = false;
                }
            }
        });

        // Si hay algún campo inválido, evitar el envío
        if (!isValid) {
            event.preventDefault();
        }
    });

    // ==========================================================================
    // Smooth Scroll para los enlaces de la navegación
    // ==========================================================================
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 60 // Ajuste para el navbar fijo
            }, 800);
        }
    });
});