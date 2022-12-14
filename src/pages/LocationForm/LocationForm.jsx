import { useContext } from "react";
import { LocationFormContext } from "../../context/location-form.context";
import { AuthContext } from "../../context/auth.context";

function LocationForm() {
    const { city,
        country,
        date,
        address,
        coordinates,
        handleCity,
        handleClick,
        handleDate,
        handleSubmit } = useContext(LocationFormContext);
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <form onSubmit={handleSubmit}>
            <label>City</label>
            <input
                value={city}
                onChange={handleCity}
                placeholder="Address"
                {...address}
                isTyping={address.value !== ""}
                className="geocoder"
            />
            {address.suggestions?.length > 0 && (
                <div>
                    {address.suggestions.map((suggestion, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    handleClick(suggestion);
                                }}
                            >
                                {suggestion.place_name}
                            </div>
                        );
                    })}
                </div>
            )}
            {isLoggedIn && (
                <>
                    <input id="userOwnerId-input" value={user._id} type="string" name="userOwnerId" hidden />
                </>
            )}
            <input name="coordinates" value={coordinates} type="text" hidden />
            <input name="country" value={country} type="text" hidden />
            <label>Date</label>
            <input value={date} type="date" onChange={handleDate} />

            <button type="submit">Create</button>
        </form>
    )
}

export default LocationForm;