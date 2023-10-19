import { html, customElement, css } from 'lit-element'
import { Connected } from './connected'
import { sharedStyles } from './shared-styles'
import { dispatch } from "../state";
import { TruckDcmnt } from "../state/models/truck";

declare global {
  interface HTMLElementTagNameMap {
    'view-truck-c': TruckC
  }
}

@customElement('view-truck-c')
export class TruckC extends Connected {

  // Why this? Allows the form submit to fire submit(form) method
  firstUpdated() {
    const form = this.shadowRoot?.getElementById("truckForm");
    if (!!form) {
      form.onsubmit = (e: Event) => {
        e.preventDefault();
        this.submit(form);
      };
    }
  }

  submit(form) {
    let data = {};
    data["motor"] = form["motor"].value;
    data["model"] = form["model"].value;
    data["manufacturer"] = form["manufacturer"].value;
    data["color"] = form["color"].value;
    dispatch.truck.create(data as TruckDcmnt)
  }

  render() {
    return html`
      <h3>Add Truck Document to the Collection:</h3>
      <form id="truckForm">
        <fieldset>
          <label for="motor">Motor:</label><br/>
          <input type="text" id="motor" name="motor" value="Motor  ${Date.now()}" /><br />
                    <label for="model">Model:</label><br/>
          <input type="text" id="model" name="model" value="Model  ${Date.now()}" /><br />
                    <label for="manufacturer">Manufacturer:</label><br/>
          <input type="text" id="manufacturer" name="manufacturer" value="Manufacturer  ${Date.now()}" /><br />
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
