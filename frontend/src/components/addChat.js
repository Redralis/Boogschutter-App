import React from 'react'
import addChatButton from "../images/addChat.png"
import "../styles/Contacts.css"
import Select from 'react-select'
import axios from "axios";
import { useState, useEffect } from "react";
import { db, auth } from '../firebase/firebase'
import {useAuthState} from  'react-firebase-hooks/auth'




function AddChat() {
    const [user] = useAuthState(auth);

    const [users, setUsers] = useState([])
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


    const [name, setName] = useState("")

async function addChat(values){
    if(values !== "" && name !== ""){
    if (!values.some(item => item.split(',')[0] === auth.currentUser.email)) {
        values.unshift(auth.currentUser.email);
      }
  
      await db.collection('chats').add({
        name: name,
        users: [...values],
      })
    }
}

class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) { this.setState({ value: event}); }
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.value !== "" && name !== ""){
        addChat(this.state.value.map(doc => doc.value))
        this.setState({ value: ""})
        setName("");
        
        }
    }    

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="modal-body">
                
                    <Select placeholder={<div>Zoek gebruikers</div>}  value={this.state.value} onChange={this.handleChange} closeMenuOnSelect={false} blurInputOnSelect={false} isMulti options={[
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
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuleren</button>
                    <button type="submit" value="Submit" className="btn addButton" >Toevoegen</button>
                </div>
            </form>



        );
    }
}

    return (
        <>
        {user ? <><div className='fixed-bottom'>
                <img className='addChat' alt='addingChat' src={addChatButton} data-toggle="modal" data-target="#exampleModalCenter"></img>
            </div>


            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Voeg een gesprek toe</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            
                        </div>
                        <div className="modal-body">
                        <input type="text" className="form-control"  placeholder="Gesprek naam..." value={name} onChange={(event) => setName(event.target.value)}/>
                        </div>
                        <ChatForm />
                    </div>
                </div>
            </div></> : <></>}
            
        </>
    )
}

export default AddChat