import React, {useState} from "react";
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.value || null);
  const [error, setError] = useState("");


  // used to reset the form
  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  // ensure that form will can't be blank
  function validate() {

    if (name === "" && interviewer < 1) {
      setError("Fill everything in, what ya doing?!");
      return;
    }
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer < 1) {
      setError("Please select an interviewer");
      return;
    }


    setError("");  
    props.onSave(name, interviewer);
  }


  return(
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        value={name}
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setName(event.target.value)}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} /> 
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={() => {validate()}}>Save</Button>
    </section>
  </section>
</main>
  )
}