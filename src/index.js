import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addCountries } from './markUp';
import { singleCountry } from './markUp';
import './css/styles.css';


const DEBOUNCE_DELAY = 500;
export const refs = {
    formBox: document.querySelector('#search-box'),
    formUl: document.querySelector('.country-list'),
    formDiv: document.querySelector('.country-info'),
}

refs.formBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  refs.formUl.innerHTML = '';
  refs.formDiv.innerHTML = '';

  let inputValue = event.target.value.trim();

  if (inputValue) {
    fetchCountries(inputValue)
      .then(result => {
        if (!result.ok) {
          throw new Error(result.status);
        }
        return result.json();
      })
        .then(countries => {
            if (countries.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
                return;
            }
            if (countries.length >= 2 && countries.length <= 10) {
                addCountries(countries);
                return;
            }
            singleCountry(countries);
        }).catch(error => {
            Notify.warning('Oops, there is no country with that name');
      } );
  }
}
