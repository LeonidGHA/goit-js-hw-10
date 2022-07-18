'use strict';

export const findCurrentCountry = queryCountry => {
  return fetch(
    `https://restcountries.com/v3.1/name/${queryCountry}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
