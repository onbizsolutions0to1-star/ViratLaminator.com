/* =========================================================
   QUALITY INSTRUMENTS SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".instrument-track");
    const slides = Array.from(
        document.querySelectorAll(".instrument-slide")
    );

    const prevButton = document.querySelector(".instrument-prev");
    const nextButton = document.querySelector(".instrument-next");

    const dots = Array.from(
        document.querySelectorAll(".instrument-dot")
    );

    if (!track || !slides.length) {
        return;
    }


    /* =====================================================
       CURRENT SLIDE
    ===================================================== */

    let currentIndex = 0;
    let isMoving = false;


    /* =====================================================
       GET SCREEN MODE
    ===================================================== */

    function isDesktop() {
        return window.innerWidth >= 1101;
    }


    /* =====================================================
       GET VISIBLE CARDS
    ===================================================== */

    function getVisibleCards() {

        if (window.innerWidth <= 650) {
            return 1;
        }

        if (window.innerWidth <= 1100) {
            return 2;
        }

        return 4;
    }


    /* =====================================================
       UPDATE DOTS
    ===================================================== */

    function updateDots() {

        if (!dots.length) {
            return;
        }

        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });
    }


    /* =====================================================
       MOVE TO SLIDE
    ===================================================== */

    function moveTo(index) {

        /*
         * DESKTOP:
         * All 4 cards are already visible.
         * Do absolutely nothing.
         */

        if (isDesktop()) {
            return;
        }


        if (isMoving) {
            return;
        }


        const visibleCards =
            getVisibleCards();


        /*
         * Make index circular
         */

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }


        currentIndex = index;


        /* =================================================
           MOBILE / TABLET
        ================================================= */

        const slide =
            slides[currentIndex];

        if (!slide) {
            return;
        }


        isMoving = true;


        /*
         * Scroll the selected card into view
         */

        slide.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });


        updateDots();


        setTimeout(function () {

            isMoving = false;

        }, 500);

    }


    /* =====================================================
       NEXT
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                if (isDesktop()) {
                    return;
                }

                moveTo(currentIndex + 1);

            }
        );

    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                if (isDesktop()) {
                    return;
                }

                moveTo(currentIndex - 1);

            }
        );

    }


    /* =====================================================
       DOTS
    ===================================================== */

    dots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function () {

                if (isDesktop()) {
                    return;
                }

                moveTo(index);

            }
        );

    });


    /* =====================================================
       TOUCH SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    track.addEventListener(
        "touchstart",
        function (event) {

            if (isDesktop()) {
                return;
            }

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    track.addEventListener(
        "touchend",
        function (event) {

            if (isDesktop()) {
                return;
            }

            touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchStartX - touchEndX;


            if (difference > 50) {

                moveTo(currentIndex + 1);

            }
            else if (difference < -50) {

                moveTo(currentIndex - 1);

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (isDesktop()) {
                return;
            }


            if (event.key === "ArrowRight") {

                moveTo(currentIndex + 1);

            }


            if (event.key === "ArrowLeft") {

                moveTo(currentIndex - 1);

            }

        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            /*
             * When returning to desktop,
             * reset everything.
             */

            if (isDesktop()) {

                currentIndex = 0;

                track.scrollTo({
                    left: 0,
                    behavior: "auto"
                });

                updateDots();

            }

        }
    );


    /* =====================================================
       INITIAL
    ===================================================== */

    currentIndex = 0;

    updateDots();

});