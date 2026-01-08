$(document).ready(function () {
    // 1. Console greeting
    console.log("Portfolio loaded for Joaquin Leppe - Interior Designer");

    // 2. Smooth Scrolling for Navigation Links
    $('nav a').on('click', function (e) {
        const targetId = $(this).attr('href');

        // Only action if it's an anchor link
        if (targetId.startsWith('#') && targetId.length > 1) {
            e.preventDefault();

            let targetPosition = 0;

            if (targetId === '#about') {
                targetPosition = 0;
            } else if (targetId === '#contact') {
                targetPosition = $(document).height();
            } else if (targetId === '#experience') {
                const $expSection = $('#experience');
                if ($expSection.length) {
                    // Target the h2 inside for text alignment
                    const $h2 = $expSection.find('h2');
                    if ($h2.length) {
                        targetPosition = $h2.offset().top - 100;
                    } else {
                        targetPosition = $expSection.offset().top - 100;
                    }
                }
            } else {
                const $targetElement = $(targetId);
                if ($targetElement.length) {
                    targetPosition = $targetElement.offset().top - 50;
                }
            }

            // Perform animation
            $('html, body').animate({
                scrollTop: targetPosition
            }, 100); // 800ms duration
        }
    });

    // 3. Hover effects are handled by CSS

    // 4. Real-time Contact Form Validation with jQuery
    const $contactForm = $('#contact-form');

    function validateInput($input, type) {
        const value = $input.val().trim();
        let isValid = false;

        if (type === 'name' || type === 'message') {
            isValid = value.length > 0;
        } else if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }

        if (isValid) {
            $input.removeClass('is-invalid').addClass('is-valid');
        } else {
            $input.removeClass('is-valid').addClass('is-invalid');
        }
        return isValid;
    }

    if ($contactForm.length) {
        const $nameInput = $('#form-name');
        const $emailInput = $('#form-email');
        const $messageInput = $('#form-message');

        // Input event listener
        $contactForm.find('.form-control').on('input blur', function () {
            const type = this.id.replace('form-', '');
            validateInput($(this), type);
        });

        // Submit event listener
        $contactForm.on('submit', function (e) {
            e.preventDefault();

            const isNameValid = validateInput($nameInput, 'name');
            const isEmailValid = validateInput($emailInput, 'email');
            const isMessageValid = validateInput($messageInput, 'message');

            if (isNameValid && isEmailValid && isMessageValid) {
                alert('Message sent successfully!');
                this.reset();
                $contactForm.find('.form-control').removeClass('is-valid');
            }
        });
    }


    // 5. Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('is-visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Initialize observer on elements with .animate-on-scroll
    $('.animate-on-scroll').each(function () {
        observer.observe(this);
    });
});