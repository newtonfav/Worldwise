/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountriesList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a country on the map"}
      />
    );

  //Time Complexiety is O(n^2)
  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country))
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   else return arr;
  // }, []);

  const getUniqueCountries = (cities) => {
    let countryMap = new Map();

    for (const city of cities) {
      if (!countryMap.has(city.country))
        countryMap.set(city.country, {
          country: city.country,
          emoji: city.emoji,
        });
    }

    return Array.from(countryMap.values());
  };

  const countries = getUniqueCountries(cities);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </ul>
  );
}

export default CountriesList;
