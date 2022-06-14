import React from 'react';

import '../styles/Documents.css'
import Navbar from "../components/Navbar";
import AuthChecker from "../components/AuthChecker";

import 'react-edit-text/dist/index.css';

export function Documents() {

// const textarea = document.querySelector("textarea");

// function handleResize () {
//     this.style.height = 'auto'
//     this.style.height = this.scrollHeight + 'px'

    
// }
// textarea.addEventListener('input', handleResize)
    return (
        <>
            <Navbar />
            <AuthChecker></AuthChecker>
            <div className="documentsScreen">
                <div className="container float-center">
                    <div className="top">
                        <h1 className="titel h3 mb-3 fw-normal">Uw aantekeningen</h1>
                        <textarea cols="40" rows="3"></textarea>
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

export default Documents;