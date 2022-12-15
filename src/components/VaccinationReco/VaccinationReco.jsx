

function VaccinationReco({ vaxCountry }) {
    console.log(vaxCountry)
    return (
        <div>
            <h1>Vaccinations:</h1>
            <h2>Needed:</h2>
            <h3>
                {vaxCountry.mandatory.map(vaxName => {
                    return <li>{vaxName.name}</li>
                })}
            </h3>
            {vaxCountry.recommendation[0].name &&
                <>
                <h3>Recommended: </h3>
                <ul>
                    {vaxCountry.recommendation.map(vaxName => {
                        return <li> {vaxName.name}</li>
                    })}
                </ul>
                </>
            }
        </div>
    )
}

export default VaccinationReco;  
