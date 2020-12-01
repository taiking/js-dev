function onClick() {
  fetch("http://localhost:8081")
    .then((response) => response.json())
    .then((data) => {
      document.getElementsByClassName("status")[0].innerText = data.status;
    });
}
