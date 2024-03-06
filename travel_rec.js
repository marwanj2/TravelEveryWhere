const userInput = document.getElementById('searchInput').value.toLowerCase();
const btnSearch = document.getElementById("searchBtn");

let countriesContainer = document.getElementById('recommandationResult');


function displayRecommandations(input) {
    fetch('travel_rec.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.countries;
            countriesContainer.innerHTML = "";

            const countriesList = document.createElement('ul');
            countriesList.classList.add('countries-list');

            countries.forEach(country => {
                if (country.name.toLowerCase().includes(input.toLowerCase())) {
                    const countryItem = document.createElement('li');
                    countryItem.classList.add('country-item');
                    countryItem.innerHTML = `<strong>${country.name}</strong>`;

                    const citiesList = document.createElement('ul');
                    citiesList.classList.add("cities-list");

                    country.cities.forEach(city => {
                        const cityItem = document.createElement("li");
                        cityItem.classList.add('city-item');
                        cityItem.innerHTML = `<img src="${city.imageUrl}" style="max-width:700px" /><br>
                                                <strong>${city.name}</strong><br>
                                                ${city.description}`;
                        citiesList.appendChild(cityItem);
                    });
                    countryItem.appendChild(citiesList);
                    countriesList.appendChild(countryItem);
                }
            });

            countriesContainer.appendChild(countriesList);
        })
}

btnSearch.addEventListener('click', displayRecommandations(userInput))



