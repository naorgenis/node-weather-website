//client
console.log("client!");
const fetchDataWeather = (address) => {};

const weatherForm = document.querySelector("form");
const inputAddress = document.querySelector("input");
const p1 = document.querySelector(".forecast");
const p2 = document.querySelector(".error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  p1.textContent = "Loading...";

  fetch(`http://localhost:3000/weather?address=${inputAddress.value}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          p1.textContent = data.error;
          p2.textContent = "";
        } else {
          p1.textContent = data.location;
          p2.textContent = data.forecast + " celsius";
          console.log(data);
        }
      });
    }
  );
});
