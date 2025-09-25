const CountryDisplay = ({countries, search, setCountry}) => {
    if (countries && search) {
        return (
            <ul>
                {countries.map(country => (
                    <li key={country.name.common}>{country.name.common}
                        <button onClick={ () => setCountry(country)}>Show</button></li>
                ))}
            </ul>
        )
    }
    return null
}

export default CountryDisplay;