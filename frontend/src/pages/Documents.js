
import pdf from '../pdf/boogschutter.pdf'
import '../styles/Documents.css'
import Navbar from "../components/Navbar";

export function Documents() {
  return (
    <>
      <Navbar />
      <div className="documentsScreen">
        <div className="container float-center">



          <h1 className="h3 mb-3 fw-normal">Documenten </h1>
          {/* <iframe src={pdf} title="Regels boogschuttersbond." width="100%" height="980vh">Your browser does not support embedded frames (iframes)</iframe> */}
          <a href={pdf} edownload="Boogschutters-regelementen">Download de regelementen van de boogschuttersbond</a>
        </div>


      </div>
    </>
  );
}

export default Documents;