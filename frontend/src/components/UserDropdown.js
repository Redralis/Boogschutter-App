import React, { useRef } from 'react'
import "../styles/Contacts.css"
import Select from 'react-select'
import axios from "axios";
import { useState, useEffect } from "react";
import { db, auth } from '../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { editUser } from '../ApiServices/EditUser';

axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }


function AddChat() {
    const [user] = useAuthState(auth);
    const [users, setUsers] = useState([])

    const AdminBox = useRef()
    const TrainerBox = useRef()
    const MatchLeaderBox = useRef()

    useEffect(() => {
        axios
            .get("http://localhost:3060/members")
            .then(function (response) {
                setUsers(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    function setRights(mail) {
        editUser(mail, TrainerBox.current.checked, AdminBox.current.checked, MatchLeaderBox.current.checked).then(res => {
        })
    }

    var trainers = [];
    var admins = [];
    var leden = [];
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
        }

        render() {
            return (
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="modal-body">

                            <Select placeholder={<div>Zoek gebruikers</div>} value={this.state.value} onChange={this.handleChange} closeMenuOnSelect={true} blurInputOnSelect={false} options={[
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
                                type="submit"
                                value="Save"
                                className="w-100 btn agenda-buttons"
                                onClick={this.handleSubmit}
                            />
                        </div>
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