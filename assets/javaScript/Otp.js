// import Swal from 'sweetalert2'
// const Swal = require('sweetalert2')

document.addEventListener("DOMContentLoaded", function (event) {
  function OTPInput() {
    const inputs = document.querySelectorAll("#otp > *[id]");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
          inputs[i].value = "";
          if (i !== 0) inputs[i - 1].focus();
        } else if (event.key >= "0" && event.key <= "9") {
          inputs[i].value = event.key;
          if (i !== inputs.length - 1) inputs[i + 1].focus();
          event.preventDefault();
        } else if (event.keyCode >= 65 && event.keyCode <= 90) {
          // Letters
          inputs[i].value = String.fromCharCode(event.keyCode);
          if (i !== inputs.length - 1) inputs[i + 1].focus();
          event.preventDefault();
        }
      });
    }
  }
  OTPInput();
});

document.addEventListener("DOMContentLoaded", function () {
  var otpForm = document.getElementById("otpForm");
  otpForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    let otpvalues = "";
    let otps = document.getElementsByClassName("rounded");
    Array.from(otps).forEach((element) => {
      otpvalues += `${element.value}`;
    });
    console.log(otpvalues);

    fetch("http://localhost:5010/api/admin/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({otp: otpvalues}),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          document.getElementById("otpValidateSpan").textContent =
            errorData.message;
          document.getElementById("otpValidateSpan").style.color = "red";
          throw new Error(errorData.message);
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New user added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.href = `${data.redirect}`;
        }, 1500);
      })
      .catch((error) => {
        throw new Error(error, "error");
      });
  });
});

