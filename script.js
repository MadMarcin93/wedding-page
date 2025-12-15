// Google Maps Initialization
function initMap() {
  // Default location - Replace with your actual venue address
  const venueLocation = {
    lat: 37.18097,
    lng: -3.58943,
  }; // Example: New York City

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: venueLocation,
    styles: [
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }],
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  });

  const marker = new google.maps.Marker({
    position: venueLocation,
    map: map,
    title: "Wedding Venue",
  });

  // Geocode the address if you have a specific address
  // Uncomment and update the address below
  /*
    const geocoder = new google.maps.Geocoder();
    const address = '123 Wedding Lane, Beautiful City, ST 12345';
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
        }
    });
    */
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Google Sheets RSVP Form Submission
// IMPORTANT: You need to set up a Google Apps Script Web App to handle form submissions
// See README.md for instructions

const scriptURL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"; // Replace with your Web App URL

const form = document.getElementById("rsvp-form");
const formMessage = document.getElementById("form-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Disable submit button
  const submitBtn = form.querySelector(".submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  // Get form data
  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    guests: formData.get("guests"),
    attending: formData.get("attending"),
    dietary: formData.get("dietary"),
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Since we're using no-cors mode, we can't read the response
    // But we'll assume success if no error is thrown
    showMessage(
      "Thank you! Your RSVP has been submitted successfully.",
      "success"
    );
    form.reset();
  } catch (error) {
    console.error("Error:", error);
    showMessage(
      "There was an error submitting your RSVP. Please try again or contact us directly.",
      "error"
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit RSVP";
  }
});

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = "block";

  // Scroll to message
  formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });

  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = "none";
  }, 5000);
}

// Update header image - Replace with your own photo
// You can update the src attribute in index.html or use JavaScript:
// document.getElementById('header-image').src = 'path/to/your/photo.jpg';
