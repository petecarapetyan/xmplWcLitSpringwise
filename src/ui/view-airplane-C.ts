import { html, customElement, css } from 'lit-element'
import { Connected } from './connected'
import { sharedStyles } from './shared-styles'
import { dispatch } from "../state";
import { AirplaneDcmnt } from "../state/models/airplane";

declare global {
  interface HTMLElementTagNameMap {
    'view-airplane-c': AirplaneC
  }
}

@customElement('view-airplane-c')
export class AirplaneC extends Connected {

  // Why this? Allows the form submit to fire submit(form) method
  firstUpdated() {
    const form = this.shadowRoot?.getElementById("airplaneForm");
    if (!!form) {
      form.onsubmit = (e: Event) => {
        e.preventDefault();
        this.submit(form);
      };
    }
  }

  submit(form) {
    let data = {};
    data["make"] = form["make"].value;
    data["model"] = form["model"].value;
    data["color"] = form["color"].value;
    dispatch.airplane.create(data as AirplaneDcmnt)
  }

  render() {
    return html`
      <h3>Add Airplane Document to the Collection:</h3>
      <form id="airplaneForm">
        <fieldset>
          <label for="make">Make:</label><br/>
          <input type="text" id="make" name="make" value="Make  ${Date.now()}" /><br />
                    <label for="model">Model:</label><br/>
          <input type="text" id="model" name="model" value="Model  ${Date.now()}" /><br />
                    <label for="color">Color:</label><br/>
          <input type="text" id="color" name="color" value="Color  ${Date.now()}" /><br />
          <br />
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
      <p>A <em>'Document'</em> in Firestore is perhaps analagous to the row of a table, in SQL-land</p>
    `;
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        button {
          padding: 1em;
        }
        input {
          margin-bottom: 1em;
        }
      `,
    ]
  }
}
