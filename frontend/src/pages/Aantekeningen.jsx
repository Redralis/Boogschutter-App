import '../styles/Documents.css'
import Navbar from "../components/Navbar";
import AuthChecker from "../components/AuthChecker";


export function Aantekeningen() {
    let input;

    const getInput = (event) => {
        input = event.target.value;
        console.log(input);
    }
    function updateNote() {
        
    }

    return (
        <>
            <Navbar />
            <AuthChecker></AuthChecker>
            <div className="documentsScreen">
                <div className="container float-center">
                    <div className="top">
                        <h1 className="titel h3 fw-normal">Uw aantekeningen</h1>
                        <textarea onChange={getInput} cols="40" rows="18"></textarea>
                        
                    </div>
                    <div className="middle">
                        <button onClick={} type="button " className="save">
                            Save
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Aantekeningen;