(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    document.addEventListener("DOMContentLoaded", function() {
        const gifButton = document.getElementById('gifButton');
        const giftModal = document.getElementById('giftModal');
        const closeModalButton = document.getElementById('closeModalButton');
    
        gifButton.addEventListener('click', function() {
            giftModal.style.display = 'block'; // Show the modal
            setTimeout(() => { // Delay to allow display change
                giftModal.classList.add('show'); // Add show class for animation
            }, 10); // Short delay for CSS transition
        });
    
        closeModalButton.addEventListener('click', function() {
            giftModal.classList.remove('show'); // Remove show class
            setTimeout(() => { // Delay to allow animation to finish
                giftModal.style.display = 'none'; // Hide the modal
            }, 300); // Match the transition duration
        });
    });


    // Back to top button
    $(document).ready(function () {
        // Kiểm tra khi người dùng cuộn trang
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn('slow');  // Hiện nút 'Back to Top'
            } else {
                $('.back-to-top').fadeOut('slow'); // Ẩn nút 'Back to Top'
            }
        });
    
        // Khi người dùng bấm vào nút 'Back to Top'
        $('.back-to-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1500, 'swing');  // Cuộn về đầu trang
            return false;  // Ngăn chặn hành vi mặc định của nút
        });
    });
    

    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,                    // Lặp vô hạn
        margin: 10,                    // Khoảng cách giữa các item
        nav: false,                    // Tắt nút điều hướng
        autoplay: true,                // Tự động chạy carousel
        autoplayTimeout: 3000,         // Thời gian tự động chuyển
        autoplayHoverPause: true,      // Dừng lại khi di chuột vào
        smartSpeed: 1000,              // Tốc độ chuyển đổi
        responsive: {
            0: {
                items: 2,              // Hiển thị 2 item trên màn hình nhỏ
                slideBy: 1,            // Trượt 1 item mỗi lần kéo
                touchDrag: true,       // Kích hoạt kéo qua lại
                mouseDrag: true        // Kích hoạt kéo bằng chuột
            },
            576: {
                items: 2,              // Hiển thị 2 item từ 576px+
                slideBy: 1
            },
            768: {
                items: 3,              // Hiển thị 3 item từ 768px+
                slideBy: 1
            },
            992: {
                items: 4,              // Hiển thị 4 item từ 992px+
                slideBy: 1
            },
            1200: {
                items: 6               // Hiển thị 6 item từ 1200px+
            }
        }
    });

    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,                  // Cho phép lặp vô hạn
        margin: 10,                  // Khoảng cách giữa các item
        nav: false,                  // Tắt nút điều hướng
        autoplay: true,              // Tự động chạy carousel
        autoplayTimeout: 3000,       // Thời gian tự động chuyển
        autoplayHoverPause: true,    // Tạm dừng khi di chuột vào carousel
        smartSpeed: 1000,            // Tốc độ chuyển đổi
        responsive: {
            0: {
                items: 2,             // Hiển thị 2 item trên màn hình nhỏ
                slideBy: 1,           // Kéo 1 item mỗi lần
                touchDrag: true,      // Kích hoạt kéo qua lại
                mouseDrag: true       // Kích hoạt kéo bằng chuột
            },
            576: {
                items: 2,             // Hiển thị 2 item từ 576px+
                slideBy: 1
            },
            768: {
                items: 3,             // Hiển thị 3 item từ 768px+
                slideBy: 1
            },
            992: {
                items: 4,             // Hiển thị 4 item từ 992px+
                slideBy: 1
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

})(jQuery);

