
import pdf from '../pdf/boogschutter.pdf'
import '../styles/Documents.css'
import Navbar from "../components/Navbar";
import AuthChecker from "../components/AuthChecker";
import * as BsIcons from 'react-icons/bs'

export function Documents() {
  return (
    <>
      <Navbar />
      <AuthChecker></AuthChecker>
      <div className="documentsScreen">
        <div className="container float-center">
          <h1 className="h3 mb-3 fw-normal">Documenten </h1>
          <div className="card">
            <div className="card-body">
            <BsIcons.BsFillCloudDownloadFill />
              <a href={pdf} edownload="Boogschutters-regelementen"> Download de regelementen van de boogschuttersbond</a>
             
            </div>
          </div>
          <h1 className="h3 mb-3 fw-normal">Links </h1>
          <div className="card">
            <div className="card-body">
            <BsIcons.BsGraphUp />
              <a href="https://mijn.handboogsport.nl/plein/"> Bekijk de handboogsport pagina</a> <br />
              <BsIcons.BsFillCalculatorFill />
              <a href="https://play.google.com/store/apps/details?id=com.peterhohsy.archery&hl=nl&gl=US"> Bekijk de Archery Score Keeper app in de playstore
              </a>
            </div>
          </div>
          <h1 className="h3 mb-3 fw-normal">Sociale media</h1>
          <div className="card">
            <div className="card-body">
            <BsIcons.BsFacebook />
            <a href=""></a>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default Documents;