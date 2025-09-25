const CountryDisplay = ({countries, search}) => {
    if (countries && search) {
        return (
            <ul>
                {countries.map(country => (
                    <li key={country.name.common}>{country.name.common}</li>
                ))}
            </ul>
        )
    }
    return null
}

export default CountryDisplay;