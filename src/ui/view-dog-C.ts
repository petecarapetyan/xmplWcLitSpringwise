import { html, customElement, css } from 'lit-element'
import { Connected } from './connected'
import { sharedStyles } from './shared-styles'
import { dispatch } from "../state";
import { DogDcmnt } from "../state/models/dog";

declare global {
  interface HTMLElementTagNameMap {
    'view-dog-c': DogC
  }
}

@customElement('view-dog-c')
export class DogC extends Connected {

  // Why this? Allows the form submit to fire submit(form) method
  firstUpdated() {
    const form = this.shadowRoot?.getElementById("dogForm");
    if (!!form) {
      form.onsubmit = (e: Event) => {
        e.preventDefault();
        this.submit(form);
      };
    }
  }

  submit(form) {
    let data = {};
    data["name"] = form["name"].value;
    data["breed"] = form["breed"].value;
    data["age"] = form["age"].value;
    dispatch.dog.create(data as DogDcmnt)
  }

  render() {
    return html`
      <h3>Add Dog Document to the Collection:</h3>
      <form id="dogForm">
        <fieldset>
          <label for="name">Name:</label><br/>
          <input type="text" id="name" name="name" value="Name  ${Date.now()}" /><br />
                    <label for="breed">Breed:</label><br/>
          <input type="text" id="breed" name="breed" value="Breed  ${Date.now()}" /><br />
                    <label for="age">Age:</label><br/>
          <input type="text" id="age" name="age" value="Age  ${Date.now()}" /><br />
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
