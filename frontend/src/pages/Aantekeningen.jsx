import '../styles/Documents.css'
import Navbar from "../components/Navbar";
import AuthChecker from "../components/AuthChecker";
import {getNote} from "../ApiServices/Notes"


export function Aantekeningen() {

    getNote("email@gmail.com").then(r => {
    //    Retrieved data to put in inputfield of the notes.
    })

    return (
        <>
            <Navbar />
            <AuthChecker></AuthChecker>
            <div className="documentsScreen">
                <div className="container float-center">
                    <div className="top">
                        <h1 className="titel h3 fw-normal">Uw aantekeningen</h1>
                        <textarea cols="40" rows="18"></textarea>
                    </div>
                    <div className="middle">
                        <button type="button " className="save">
                            Save
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Aantekeningen;