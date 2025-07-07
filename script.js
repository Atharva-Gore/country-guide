function getCountryData() {
  const country = document.getElementById("countryInput").value.trim();
  const result = document.getElementById("result");

  if (!country) {
    result.innerHTML = "<p>Please enter a country name.</p>";
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then((data) => {
      const info = data[0];
      result.innerHTML = `
        <img src="${info.flags.svg}" class="flag" alt="Flag of ${info.name.common}" />
        <h2>${info.name.common}</h2>
        <p><strong>Capital:</strong> ${info.capital ? info.capital[0] : 'N/A'}</p>
        <p><strong>Population:</strong> ${info.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${info.region}</p>
        <p><strong>Currency:</strong> ${Object.values(info.currencies)[0].name} (${Object.values(info.currencies)[0].symbol})</p>
        <p><strong>Languages:</strong> ${Object.values(info.languages).join(", ")}</p>
      `;
    })
    .catch((error) => {
      result.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
