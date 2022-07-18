import './css/styles.css';
import debounce from 'lodash.debounce';
import { findCurrentCountry } from './js/fetchCountries';
import countryName from './templates/countryName.hbs';
import countryDescriptions from './templates/countryDescriptions.hbs';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputSearchEl = document.querySelector('#search-box');
const countrySearchListEl = document.querySelector('.country-list');
const countryDescriptionsEl = document.querySelector('.country-info');

const onPrintNameCountry = evt => {
  let textInput = evt.target.value.trim();
  if (textInput === '' || textInput === undefined) {
    countrySearchListEl.innerHTML = '';
    countryDescriptionsEl.innerHTML = '';
    return;
  }
  findCurrentCountry(textInput)
    .then(data => {
      const countries = data.map(el => ({
        ...el,
        languages: Object.values(el.languages).join(', '),
      }));

      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (countries.length >= 2) {
        countrySearchListEl.innerHTML = countryName(countries);
        countryDescriptionsEl.innerHTML = '';
        return;
      }
      countryDescriptionsEl.innerHTML = countryDescriptions(countries[0]);
      countrySearchListEl.innerHTML = '';
    })
    .catch(err => {
      if (err.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
};

inputSearchEl.addEventListener(
  'input',
  debounce(onPrintNameCountry, DEBOUNCE_DELAY)
);
