import React, { useRef } from 'react'
import "../styles/Contacts.css"
import Select from 'react-select'
import axios from "axios";
import { useState, useEffect } from "react";
import { db, auth } from '../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { editUser } from '../ApiServices/EditUser';
import { regUser } from '../ApiServices/RegUser';

axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }


function AddChat() {
    const [user] = useAuthState(auth);
    const [users, setUsers] = useState([])
    let userValue;

    const getInputValue = (event) => {
        userValue = event.target.value;
    };

    const AdminBox = useRef()
    const TrainerBox = useRef()
    const MatchLeaderBox = useRef()

    useEffect(() => {
        axios
            .get("http://localhost:5000/members")
            .then(function (response) {
                setUsers(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    function refreshPage() {
        window.location.reload(false);
    }

    function setRights(mail) {
        editUser(mail, TrainerBox.current.checked, AdminBox.current.checked, MatchLeaderBox.current.checked).then(res => {
        })
    }

    function inviteUser(mail) {
        regUser(mail).then(res => {
        })
    }

    let trainers = [];
    let admins = [];
    let leden = [];
    function groupAdmins() {
        admins = [];
        users.forEach((user) => {
            if (user.isAdmin && user.email !== auth.currentUser.email) {
                admins.push({ label: user.firstName + " " + user.lastName, value: user.email })
            }
        })
        return admins
    }
    function groupTrainers() {
        trainers = [];
        users.forEach((user) => {
            if (user.isTrainer && !user.isAdmin && user.email !== auth.currentUser.email) {
                trainers.push({ label: user.firstName + " " + user.lastName, value: user.email })
            }
        })
        return trainers
    }
    function groupLeden() {
        leden = [];
        users.forEach((user) => {
            if (!user.isTrainer && !user.isAdmin && user.email !== auth.currentUser.email) {
                leden.push({ label: user.firstName + " " + user.lastName, value: user.email })
            }
        })
        return leden;
    }

    class ChatForm extends React.Component {

        constructor(props) {
            super(props);
            this.state = { value: "" };
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(event) {
            this.setState({ value: event });

        }

        handleSubmit(event) {
            event.preventDefault();
            setRights(this.state.value.value)
            refreshPage();
        }

        handleInvite(event) {
            event.preventDefault();
            regUser(userValue)
            refreshPage()
        }

        render() {
            return (
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="modal-body">
                            <h1 className="h4 mb-3 fw-normal" >Rechten verlenen</h1>
                            <label for="gebruikerSelect">Selecteer een gebruiker</label>
                            <Select className="gebruikerSelect" placeholder={<div>Zoek gebruikers</div>} value={this.state.value} onChange={this.handleChange} closeMenuOnSelect={true} blurInputOnSelect={false} options={[
                                {
                                    label: "Beheerders",
                                    options: groupAdmins()
                                },
                                {
                                    label: "Trainers",
                                    options: groupTrainers()
                                },
                                {
                                    label: "Leden",
                                    options: groupLeden()
                                }
                            ]} />
                        </div>
                        <div className="container">
                            <div className="form-check" style={{ padding: 0 }}>
                                <input type="checkbox" ref={AdminBox} />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    ‏‏‎ ‎Beheerder
                                </label>
                            </div>
                            <div className="form-check " style={{ padding: 0 }}>
                                <input type="checkbox" ref={TrainerBox} />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    ‏‏‎ ‎Trainer
                                </label>
                            </div>
                            <div className="form-check " style={{ padding: 0 }}>
                                <input type="checkbox" ref={MatchLeaderBox} />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    ‏‏‎ ‎Wedstrijdleider
                                </label>
                            </div>
                        </div>

                        <div className="modal-body">
                            <input
                                type="button"
                                value="Save"
                                className="w-100 btn agenda-buttons"
                                data-toggle="modal"
                                data-target="#popup"
                            />
                        </div>
                        <div class="modal fade" id="popup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Rechten verlenen</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Weet je zeker dat je jouw wijzigingen wilt opslaan?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" onClick={this.handleSubmit}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <form onSubmit={this.handleInvite}>
                        <div className="container">
                            <h1 className="h4 mb-3 fw-normal" >Nieuwe gebruiker uitnodigen</h1>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email adres</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email invoeren" onChange={getInputValue}/>
                                <input
                                    type="button"
                                    value="Gebruiker uitnodigen"
                                    className="w-100 btn agenda-buttons"
                                    data-toggle="modal"
                                    data-target="#popup-newuser"
                                    style={{ marginTop: "20px" }}
                                />
                            </div>
                        </div>
                        <div class="modal fade" id="popup-newuser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Gebruiker uitnodigen</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                       Weet je zeker dat je deze gebruiker wilt uitnodigen?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" onClick={this.handleInvite}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </form>
                    </form>
                </div>
            );
        }
    }

    return (
        <>
            {user ? <>

                <ChatForm /> </>
                : <></>}

        </>
    )
}

export default AddChat