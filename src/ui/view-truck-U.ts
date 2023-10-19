import { property, html, customElement, css } from 'lit-element'
import { Connected, State } from './connected'
import { sharedStyles } from './shared-styles'
import { dispatch } from "../state";
import { TruckDcmnt,TruckSelectors } from "../state/models/truck";

declare global {
  interface HTMLElementTagNameMap {
    'view-truck-u': TruckU
  }
}

@customElement('view-truck-u')
export class TruckU extends Connected {
  @property({ type: Object })
  dcmntFocus: TruckDcmnt

  mapState(state: State) {
    return {
      dcmntFocus:  TruckSelectors.dcmntFocus(state),
    }
  }
  // What is this? Allows the form submit to fire submit(form) method
  firstUpdated() {
    if (!!this.shadowRoot) {
      const form = this.shadowRoot.getElementById("truckForm");
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
    data["motor"] = form["motor"].value;
    data["model"] = form["model"].value;
    data["manufacturer"] = form["manufacturer"].value;
    data["color"] = form["color"].value;
    dispatch.truck.updateDcmnt(data as TruckDcmnt)
  }

  render() {
    return html`
      <h3>Update Truck Document with ID of <em>'${this.dcmntFocus.id}'</em> </h3>
      <form id="truckForm">
        <fieldset>
          <label for="motor">Motor:</label><br/>
          <input type="text" id="motor" name="motor" value="${this.dcmntFocus.motor?this.dcmntFocus.motor:"" }" /><br />
                    <label for="model">Model:</label><br/>
          <input type="text" id="model" name="model" value="${this.dcmntFocus.model?this.dcmntFocus.model:"" }" /><br />
                    <label for="manufacturer">Manufacturer:</label><br/>
          <input type="text" id="manufacturer" name="manufacturer" value="${this.dcmntFocus.manufacturer?this.dcmntFocus.manufacturer:"" }" /><br />
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
