import React from "react";
import { editUser } from '../ApiServices/EditUser'

function Profile() {
    let firstName;
    let lastName;

    const setFirstName = (event) => {
        firstName = event.target.value;
    };

    const setLastName = (event) => {
        lastName = event.target.value;
    };

    const saveChanges = (event) => {
        editUser(localStorage.getItem('email'), undefined, undefined, undefined, firstName, lastName)
        window.location.reload(false);
    }

    return (
        <div>
            <div className="container">
                <h1 className="h4 mb-3 fw-normal" style={{ marginTop: "20px" }}>Naam aanpassen</h1>
                <div class="form-group">
                    <label for="inputFirstName">Voornaam</label>
                    <input type="name" class="form-control" id="inputFirstName" aria-describedby="firstNameHelp" placeholder="Voornaam invoeren" onChange={setFirstName} />
                    <label for="inputLastName" style={{ marginTop: "20px" }}>Achternaam</label>
                    <input type="name" class="form-control" id="inputLastName" aria-describedby="lastNameHelp" placeholder="Achternaam invoeren" onChange={setLastName} />
                    <input
                        type="button"
                        value="Wijzigingen opslaan"
                        className="w-100 btn agenda-buttons"
                        style={{ marginTop: "20px" }}
                        onClick={saveChanges}
                    />
                </div>
            </div>
        </div>
    );
}

export default Profile;
