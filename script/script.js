// A) set active state of nav link
$(document).ready(function () {
    // Highlight the active navbar and footer link
    let currentPage = window.location.pathname.split("/").pop();
    $(".nav-link, .footer-link").each(function () {
        if ($(this).attr("href") === currentPage) {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
});


// update the district selection on the basis of state selected
$(document).ready(function () {
    const districts = {
        haryana: ["Gurgaon", "Faridabad", "Panipat", "Ambala"],
        delhi: ["Central Delhi", "North Delhi", "South Delhi", "West Delhi"],
        rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
        uttar_pradesh: ["Lucknow", "Kanpur", "Varanasi", "Agra"]
    };

    // Populate districts based on selected state
    $('#state').change(function () {
        const selectedState = $(this).val();
        const districtDropdown = $('#district');
        districtDropdown.empty(); // Clear previous options
        districtDropdown.append('<option value="">-- Select District --</option>');

        if (selectedState && districts[selectedState]) {
            districts[selectedState].forEach(district => {
                districtDropdown.append(`<option value="${district}">${district}</option>`);
            });
        }
    });

});

// B) Form Validation and Navigation
$("#submitBtn").click(function () {
        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let message = $("#message").val().trim();
        let state = $("#state").val();
        let district = $('#district').val();
        let isValid = true;

       
        // Clear previous errors
        $(".form-control").removeClass("is-invalid");

        // Validate fields
        if (name === "") {
            $("#name").addClass("is-invalid");
            if (isValid) $("#name")[0].scrollIntoView({ behavior: "smooth" });
            isValid = false;
        }

        if (email === "" || !validateEmail(email)) {
            $("#email").addClass("is-invalid");
            if (isValid) $("#email")[0].scrollIntoView({ behavior: "smooth" });
            isValid = false;
        }

        if (message === "") {
            $("#message").addClass("is-invalid");
            if (isValid) $("#message")[0].scrollIntoView({ behavior: "smooth" });
            isValid = false;
        }

        if (state === "") {
            $("#state").addClass("is-invalid");
            if (isValid) $("#state")[0].scrollIntoView({ behavior: "smooth" });
            isValid = false;
        }

        if (district === "") {
            $("#district").addClass("is-invalid");
            if (isValid) $("#district")[0].scrollIntoView({ behavior: "smooth" });
            isValid = false;
        }

        // If all fields are valid
        if (isValid) {
            // Store data in localStorage
            localStorage.setItem("userName", name);
            localStorage.setItem("userState", state);
            localStorage.setItem("userDistrict", district);

            // Reset form
            $("#contactForm")[0].reset();

            // Navigate to home page
            window.location.href = "index.html";
        }
    });

    // Email Validation Function
    function validateEmail(email) {
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    
// C) Display user info on home page after submit the form
if (currentPage === "index.html") {
        let userName = localStorage.getItem("userName");
        let userState = localStorage.getItem("userState");
        let userDistrict = localStorage.getItem("userDistrict");
        if (userName && userState && userDistrict) {
            $(".welcome").after(
                `<div class="userDetail">
                    Hi, <strong>${userName}</strong>, I like your <strong>${userState}</strong> State and <strong>${userDistrict}</strong> District
                </div>`
            );
            localStorage.clear();
        }
    }
});



// D) Add 24 images in the gallery of hoe page
$(document).ready(function() {
    
    for (let i = 1; i <= 24; i++) {
        $('#image-gallery').append(`
            <img src="images/${i}.jpg" alt="Image ${i}">
        `);
    }
});

// E) Hide the navbar when we scroll down & show the navbar when we scroll up
$(document).ready(function () {
    let lastScrollTop = 0; // Store the last scroll position
    const $navbar = $('.navbar');

    $(window).on('scroll', function () {
        let currentScroll = $(this).scrollTop();

        if (currentScroll > lastScrollTop) {
            // Scrolling Down
            $navbar.addClass('hidden');
        } else {
            // Scrolling Up
            $navbar.removeClass('hidden');
        }

        lastScrollTop = currentScroll;
    });
});

let debounceTimer;
$(window).on('scroll', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        let currentScroll = $(this).scrollTop();
        if (currentScroll > lastScrollTop) {
            $navbar.addClass('hidden');
        } else {
            $navbar.removeClass('hidden');
        }
        lastScrollTop = currentScroll;
    }, 50);
});


// F) Switch color of navbar background if our scroll bar is more than 30 from top
$(document).ready(function () {
    const $navbar = $('.navBarBox');

    $(window).on('scroll', function () {
        let scrollPosition = $(this).scrollTop();

        if (scrollPosition > 30) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    });
});



//  G) scroll to top on button click
$(document).ready(function () {
    $('.go-to-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
});