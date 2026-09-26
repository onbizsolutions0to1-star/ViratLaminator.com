document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("quoteForm");
    const message = document.getElementById("formMessage");

    if (!form) {
        console.error("Quote form not found.");
        return;
    }

    const submitButton = form.querySelector(".quote-submit");

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        message.style.display = "none";
        message.textContent = "";

        try {

            // Get all form data
            const formData = new FormData(form);

            // Convert FormData to normal object
            const object = Object.fromEntries(formData);

            // Convert object to JSON
            const json = JSON.stringify(object);

            console.log("Sending form...");

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    body: json
                }
            );

            const result = await response.json();

            console.log("Web3Forms response:", result);

            // Successful submission
            if (response.ok && result.success) {

                message.style.display = "block";
                message.style.background = "#eaf7e8";
                message.style.color = "#2f912b";
                message.style.padding = "12px 15px";
                message.style.borderRadius = "5px";
                message.style.marginTop = "15px";

                message.textContent =
                    "Thank you! Your enquiry has been sent successfully. We will contact you soon.";

                form.reset();

            } else {

                message.style.display = "block";
                message.style.background = "#fff0f0";
                message.style.color = "#c0392b";
                message.style.padding = "12px 15px";
                message.style.borderRadius = "5px";
                message.style.marginTop = "15px";

                message.textContent =
                    result.message ||
                    "Unable to send your enquiry. Please check your Web3Forms access key.";

                console.error("Web3Forms error:", result);
            }

        } catch (error) {

            console.error("Form submission error:", error);

            message.style.display = "block";
            message.style.background = "#fff0f0";
            message.style.color = "#c0392b";
            message.style.padding = "12px 15px";
            message.style.borderRadius = "5px";
            message.style.marginTop = "15px";

            message.textContent =
                "Unable to connect to the form service. Please try again.";

        }

        submitButton.disabled = false;
        submitButton.textContent = "Send Enquiry →";

    });

});