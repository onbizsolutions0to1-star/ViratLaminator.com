/* =====================================================
   VIRAT LAMINATOR
   GLOBAL JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");


if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("show");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

}


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

const mobileLinks = document.querySelectorAll(".mobile-nav-link");


mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* =====================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener("click", (event) => {

    if (
        mobileMenu &&
        menuToggle &&
        !mobileMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {

        mobileMenu.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");

    }

});