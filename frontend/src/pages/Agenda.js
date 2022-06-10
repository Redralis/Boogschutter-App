import "../styles/Login.css"
import Navbar from "../components/Navbar";
export function Agenda() {
    return (
        <>
            <Navbar />
            <div className="loginScreen">
                <div className="container ">

                    <div className="col-xs-4 row justify-content-between">
                        <button type="button " className="agenda-buttons float-left">Vorige</button>
                        <h1 className="display-6 float-center">Datum</h1>
                        <button type="button " className="agenda-buttons float-right">Volgende</button>
                    </div>
                    
                    <h1 className="float-center display-6"> maandag </h1>
                    <div className="card">
                        <div className="card-body">
                            Masterclass boogschieten
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Agenda;