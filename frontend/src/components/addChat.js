import React from 'react'
import addChatButton from "../images/addChat.png"
import "../styles/Contacts.css"
import Select from 'react-select'

const options = [
    {
      label: "Group 1",
      options: [
        { label: "Group 1, option 1", value: "value1" },
        { label: "Group 1, option 2", value: "value2" }
      ]
    },
    { label: "A root option", value: "value3" },
    { label: "Another root option", value: "value4" }
  ];
function AddChat() {
    return (
        <>
            <div className='fixed-bottom'>
                <img className='addChat' alt='addingChat' src={addChatButton} data-toggle="modal" data-target="#exampleModalCenter"></img>
            </div>


            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Voeg een gesprek toe</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <Select options={options} isMulti closeMenuOnSelect={false}/>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuleren</button>
                            <button type="button" class="btn btn-primary">Toevoegen</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddChat