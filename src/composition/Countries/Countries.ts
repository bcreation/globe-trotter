

import gql from 'graphql-tag'

const getCountries =  gql`
  query getCountries($locale: String) {
    countries {
      name(lang: $locale)
      code
      emoji
    }
  }`
 
const getCountry = gql`
    query getCountry($locale: String , $code: ID!) {
      country(code: $code) {
        name(lang: $locale)
        code
        capital
        currencies
        emoji
        phones
        languages {
          name
        }
      }
    }`
  

export { getCountries, getCountry }
