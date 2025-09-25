import {useEffect, useState} from 'react'
import Form from './components/Form'
import Notifications from './components/Notifications'
import Countries from "./components/CountryDisplay.jsx";
import Country   from "./components/Country.jsx";
import countryService from "./services/countryService.js";

function App() {
    const [search, setSearch] = useState(null);
    const [countries, setCountries] = useState(null);
    const [country, setCountry] = useState(null);
    const [notification, setNotification] = useState([null]);

    useEffect(() => {
        console.log("nyt pitäisi hakea koko countrylista")
        countryService.getAll()
            .then(countries => {
                console.log(countries);
                if (search) {
                    const filteredCountries = countries.filter(country => {
                        return country.name.common.toLowerCase().includes(search.toLowerCase());
                    })
                    if (filteredCountries.length === 1) {
                        console.log("Nyt meidän pitäisi asettaa countrylle arvo")
                        setCountry(filteredCountries[0]);
                        setCountries(null);
                    } else if (filteredCountries.length <= 10) {
                        setCountries(filteredCountries);
                        setNotification(null);
                        setCountry(null)
                    } else {
                        setNotification("Too many matches, spesify another filter")
                        setCountries(null);
                        setCountry(null)
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [search])

    const handleCountryChange = (e) => {
        setSearch(e.target.value);
        console.log("search",search)
    }

    return (
        <div>
            <Form
                onChange={handleCountryChange}
            ></Form>
            <Notifications notification={notification} />
            <Countries countries={countries} search={search} />
            <Country country={country} />
        </div>
  )
}

export default App
