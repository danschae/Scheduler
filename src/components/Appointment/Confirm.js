import React from "react";
import Button from "components/Button"

export default function Confirm(props) {

  return (
    <main className="appointment__card appointment__card--confirm" data-testid="confirm">
  <h1 className="text--semi-bold">{props.message}</h1>
  <section className="appointment__actions">
    <Button danger onClick={() => {props.cancel()}}>Cancel</Button>
    <Button danger onClick={() => {props.delete()}}>Confirm</Button>
  </section>
</main>
  )

}