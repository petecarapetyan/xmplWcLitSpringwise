import { property, html, customElement, css } from 'lit-element'
import { Connected, State } from './connected'
import { sharedStyles } from './shared-styles'
import { dispatch } from "../state";
import { AirplaneDcmnt,AirplaneSelectors } from "../state/models/airplane";

declare global {
  interface HTMLElementTagNameMap {
    'view-airplane-u': AirplaneU
  }
}

@customElement('view-airplane-u')
export class AirplaneU extends Connected {
  @property({ type: Object })
  dcmntFocus: AirplaneDcmnt

  mapState(state: State) {
    return {
      dcmntFocus:  AirplaneSelectors.dcmntFocus(state),
    }
  }
  // What is this? Allows the form submit to fire submit(form) method
  firstUpdated() {
    if (!!this.shadowRoot) {
      const form = this.shadowRoot.getElementById("airplaneForm");
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
    data["make"] = form["make"].value;
    data["model"] = form["model"].value;
    data["color"] = form["color"].value;
    dispatch.airplane.updateDcmnt(data as AirplaneDcmnt)
  }

  render() {
    return html`
      <h3>Update Airplane Document with ID of <em>'${this.dcmntFocus.id}'</em> </h3>
      <form id="airplaneForm">
        <fieldset>
          <label for="make">Make:</label><br/>
          <input type="text" id="make" name="make" value="${this.dcmntFocus.make?this.dcmntFocus.make:"" }" /><br />
                    <label for="model">Model:</label><br/>
          <input type="text" id="model" name="model" value="${this.dcmntFocus.model?this.dcmntFocus.model:"" }" /><br />
                    <label for="color">Color:</label><br/>
          <input type="text" id="color" name="color" value="${this.dcmntFocus.color?this.dcmntFocus.color:"" }" /><br />
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
