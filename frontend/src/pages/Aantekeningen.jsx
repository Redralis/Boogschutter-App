import '../styles/Documents.css'
import Navbar from "../components/Navbar";
import AuthChecker from "../components/AuthChecker";
import {getNote} from "../ApiServices/Notes"


export function Aantekeningen() {
    let input;
    let getLoggedMail = "test@gmail.com"

    // localStorage.getItem("mail")
    let test;

    const getInput = (event) => {
        input = event.target.value;
        console.log(input);
    }
    function updateNote() {
        getNote(getLoggedMail).then(r => {
            test = r.data
            console.log(test)
        })
    }

   

    return (
        <>
            <Navbar />
            <AuthChecker></AuthChecker>
            <div className="documentsScreen">
                <div className="container float-center">
                    <div className="top">
                        <h1 className="titel h3 fw-normal">Uw aantekeningen</h1>
                        <textarea onChange={getInput} value= {test} cols="40" rows="18"></textarea>
                        
                    </div>
                    <div className="middle">
                        <button  type="button " className="save" onClick={updateNote}>
                            Save
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Aantekeningen;