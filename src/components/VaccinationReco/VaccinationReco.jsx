import './VaccinationReco.css'

function VaccinationReco({ vaxCountry }) {
    console.log(vaxCountry)
    return (
        <div className="vax-card card bg-warning mb-3">
            <div class="vax-header card-header">
                <div className="vax-logo">
                    <img src="./images/who-main-logo.png" alt="WHO logo" />
                </div>
                <h5 class="card-title">
                    <p className="card-title-main">International Travel and Health</p>
                    <p className="card-title-second">Country vaccination requirements and recommendations</p>
                </h5>
            </div>
            <ul>
                {vaxCountry.mandatory.map(vaxName => {
                    return (
                        <div className="card-text-required">
                            <li>
                                <p class="card-text">{vaxName.name}</p>
                                <p class="card-text-details">{vaxName.details}</p>
                            </li>
                        </div>
                    )
                })}
            </ul>
            {vaxCountry.recommendation[0].name &&
                <>
                    <ul>
                        {vaxCountry.recommendation.map(vaxName => {
                            return (
                                <div className="card-text-recommended">
                                    <li>
                                        <p class="card-text">{vaxName.name}</p>
                                        <p class="card-text-details">{vaxName.details}</p>
                                    </li>
                                </div>
                            )
                        })}
                    </ul>
                </>
            }
            <div className='footer'>
                For more information visit
                <a href="https://cdn.who.int/media/docs/default-source/travel-and-health/vaccination-requirements-and-who-recommendations-ith-2022-country-list.pdf?sfvrsn=be429f2_1&download=true">the WHO documentation</a>
            </div>
        </div>
    )
}

export default VaccinationReco;  
