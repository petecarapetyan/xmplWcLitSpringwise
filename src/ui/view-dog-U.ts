import { property, html, customElement, css } from 'lit-element'
import { Connected, State } from './connected'
import { sharedStyles } from './shared-styles'
import { dispatch } from "../state";
import { DogDcmnt,DogSelectors } from "../state/models/dog";

declare global {
  interface HTMLElementTagNameMap {
    'view-dog-u': DogU
  }
}

@customElement('view-dog-u')
export class DogU extends Connected {
  @property({ type: Object })
  dcmntFocus: DogDcmnt

  mapState(state: State) {
    return {
      dcmntFocus:  DogSelectors.dcmntFocus(state),
    }
  }
  // What is this? Allows the form submit to fire submit(form) method
  firstUpdated() {
    if (!!this.shadowRoot) {
      const form = this.shadowRoot.getElementById("dogForm");
      if (!!form) {
        form.onsubmit = (e: Event) => {
          e.preventDefault();
          this.submit(form);
        };
      }
    }
  }

  submit(form) {
    let data = {};
    data["id"] = this.dcmntFocus.id;
    data["name"] = form["name"].value;
    data["breed"] = form["breed"].value;
    data["age"] = form["age"].value;
    dispatch.dog.updateDcmnt(data as DogDcmnt)
  }

  render() {
    return html`
      <h3>Update Dog Document with ID of <em>'${this.dcmntFocus.id}'</em> </h3>
      <form id="dogForm">
        <fieldset>
          <label for="name">Name:</label><br/>
          <input type="text" id="name" name="name" value="${this.dcmntFocus.name?this.dcmntFocus.name:"" }" /><br />
                    <label for="breed">Breed:</label><br/>
          <input type="text" id="breed" name="breed" value="${this.dcmntFocus.breed?this.dcmntFocus.breed:"" }" /><br />
                    <label for="age">Age:</label><br/>
          <input type="text" id="age" name="age" value="${this.dcmntFocus.age?this.dcmntFocus.age:"" }" /><br />
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
