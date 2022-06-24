import '../styles/Documents.css'
import Navbar from "../components/Navbar";
import AuthChecker from "../components/AuthChecker";
import { getNote, saveNote } from "../ApiServices/Notes"
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'




export function Aantekeningen() {
    const [textarea, setTextArea] = useState("");
    function getAPIData() {
        getNote(localStorage.getItem("email")).then(r => {
            
            body = r.result.body
            setTextArea(body);
        })
    }


    useEffect(() => {
        getAPIData();
    }, [])

   
    let body;

    const updateTextArea = (event) => {
        setTextArea(event.target.value)
    }




    function setAPIData() {
        let savedData = {
            "textarea": textarea,
            "getLoggedMail": localStorage.getItem("email")
        }
        saveNote(savedData).then(r => {
            
            setTextArea(body);
        })
        
        Swal.fire({
            title: 'Opgeslagen',
            icon: 'success',
            confirmButtonText: 'Sluiten',
            confirmButtonColor: '#0F6E0F',
            
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
                        <textarea onChange={updateTextArea} value={textarea} cols="40" rows="18"></textarea>

                    </div>
                    <div className="middle">
                        <button type="button " className="save" onClick={setAPIData}>
                            Save
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Aantekeningen;