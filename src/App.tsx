import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { InvitationGenerator } from './components/InvitationGenerator';
import { Invitation } from './components/Invitation';
import { IInvitation } from './IInvitation';
import { BsFillSunFill } from 'react-icons/bs';

function App() {

  const getSavedInvitations = () => {
    // restore invitations from local storage
    let invitations: IInvitation[] = [];
    const invitationsLS = localStorage.getItem("invitations");
    if (invitationsLS) {
      try {
        invitations = JSON.parse(invitationsLS as string);
        invitations = invitations.map(invitation => {
          return {
            ...invitation,
            eventDate: new Date(invitation.eventDate)
          }
        });
      } catch (e) {
        console.log("Error occured when attempted to parse invitations from local stroage! error = ", e);
      }
    }
    return invitations;
  }

  const [invitations, setInvitations] = useState<IInvitation[]>(getSavedInvitations());
  const [invitationToEdit, setInvitationToEdit] = useState<IInvitation | null>(null);

  const [showCreateNewInvitationUi, setShowCreateNewInvitationUi] = useState(false);

  const onCreateNewInvitationButtonClicked = () => {
    setShowCreateNewInvitationUi(true);
  }

  const onClose = (save?: boolean) => {
    setShowCreateNewInvitationUi(false);
    setInvitationToEdit(null);
    if (save) {
      saveInvitations();
    }
  }

  const addInvitation = (invitation: IInvitation) => {
    const newInvitations = [...invitations, invitation];
    setInvitations(newInvitations);
    onClose();
  }

  const saveInvitations = () => {
    localStorage.setItem("invitations", JSON.stringify(invitations));
  };

  useEffect(() => {
    // invitations changed, cache them
    saveInvitations();
  }, [invitations])

  const removeInvitation = (invitation: IInvitation) => {
    if (!window.confirm("Are you sure you want to delete invitation named '" + invitation.name + "'?")) return;

    let newInvitations = invitations;
    newInvitations = newInvitations.filter(inv => inv !== invitation);
    setInvitations(newInvitations);
  }

  useEffect(() => {
    setShowCreateNewInvitationUi(!!invitationToEdit);
  }, [invitationToEdit]);

  const editInvitation = (invitation: IInvitation) => {
    setInvitationToEdit(invitation);
    // let newInvitations = invitations;
    // newInvitations = newInvitations.filter(inv => inv !== invitation);
    // setInvitations(newInvitations);
  }

  return (
    <div className="App flex flex-col gap-2 items-center">
      <header className="App-header bg-blue-400 w-full h-8 flex items-center justify-center">
        awesome header
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> */}
      </header>

      <section className='flex flex-col items-center w-full px-4 flex-grow'
        style={{maxWidth: "70rem"}}
      >
        {
          !showCreateNewInvitationUi &&
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onCreateNewInvitationButtonClicked}>Create new invitation +
          </button>
        }

        {
          !showCreateNewInvitationUi &&
          <div className='w-full'>
            <h1 className='text-2xl mb-2'>Invitations</h1>
            {!invitations.length && <p className='italic'>No invitations found</p>}
            <ul className='flex flex-col gap-2'>
              {invitations.map(invitation =>
                <Invitation
                  key={invitation.id}
                  invitation={invitation}
                  onDelete={() => removeInvitation(invitation)}
                  onEdit={() => editInvitation(invitation)}
                />
              )}
            </ul>
          </div>
        }

        {showCreateNewInvitationUi &&
          <InvitationGenerator
            close={(save) => onClose(save)}
            addInvitation={addInvitation}
            invitation={invitationToEdit}
          />
        }
      </section>

      <footer>
        <p className='flex items-center gap-1 text-xs text-slate-300'> <BsFillSunFill/>built on a hot summer day - 2022</p>
      </footer>
    </div>
  );
}

export default App;
