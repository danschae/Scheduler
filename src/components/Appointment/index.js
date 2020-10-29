import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"

export default function Appointment(props) {

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
      transition(SAVING)
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW)
    })
    
    
  }

  function transferConfirm() {
    transition(CONFIRM)
  }

  function transferEdit() {
    transition(EDIT)
  }

  function deleteInterview() {
    transition(DELETING)
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY)
    })
  }




  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        transfer={transferConfirm}
        edit={transferEdit}
      />
      )}
        {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onCancel={() => back()}
        bookInterview={props.bookInterview}
        onSave={save}
      />
      )}
        {mode === SAVING && <Status message={"Please wait"}/>}
        {mode === DELETING && <Status message={"Cancelling..."}/>}
        {mode === CONFIRM && (
      <Confirm cancel={back} delete={deleteInterview} message={"Are you sure you want to cancel the appointment?"}/>)}
        {mode === EDIT && (
      <Form 
        name={props.interview.student}
        value={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        bookInterview={props.bookInterview}
        onSave={save}
      />
        )}
      
    </article>
  )
}