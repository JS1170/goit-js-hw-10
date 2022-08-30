import { refs } from './index';

export function addCountries(countries) {
  const countriesResult = countries.map(
    ({ flags: { svg }, name: { official } }) => {
      return `<li><img width=50 src="${svg}" alt="${official}"/><p>${official}</p></li>`;
    }
  );
  refs.formUl.innerHTML = countriesResult.join('');
}

export function singleCountry([country]) {
    const {
        flags: { svg },
        name: { official },
        capital,
        population,
        languages } = country;
  const oneCountryMarkup = `<img width=40 src="${svg}" alt="${official}"/>
    <h2>${official}</h2>
    <p><b>Capital:</b> ${capital}</p>
    <p><b>Population:</b> ${population}</p>
    <p><b>Languages:</b> ${Object.values(languages).join(", ")}</p>`;
  refs.formDiv.innerHTML = oneCountryMarkup;
}
