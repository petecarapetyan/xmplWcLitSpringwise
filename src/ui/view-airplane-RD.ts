import { property, html, customElement, css } from 'lit-element'
import { Connected, State } from './connected'
import { sharedStyles } from './shared-styles'
import { dispatch } from "../state";
import { AirplaneSelectors } from "../state/models/airplane";

declare global {
  interface HTMLElementTagNameMap {
    'view-airplane-rd': AirplaneRD
  }
}

@customElement('view-airplane-rd')
export class AirplaneRD extends Connected {
  @property({ type: Object,
    hasChanged(_newVal, _oldVal) {
      return true; // thus always render. No, I don't understand why, just the only way to get it to work.
    }
  })
  airplaneClctn: {}


  mapState(state: State) {
    return {
      airplaneClctn: AirplaneSelectors.airplaneClctn(state),
    }
  }


  delete(_e: Event) {
    dispatch.airplane.delete(_e?.target?.["id"])
  }

  loadUpdateView(_e: Event) {
    dispatch.airplane.loadUpdateView(_e?.target?.["id"])
  }

  render() {
    return html`
    <h3>Airplane Collection</h3>
    <a href="/airplaneC"><button type="button">Add Airplane Document</button></a>
    <div class="table">
        ${Object.keys(this.airplaneClctn).map(key => {
          const dcmnt = this.airplaneClctn[key];
          return html`
            <div class="row">
              <div class="cell">
                <button id=${dcmnt["id"]} @click=${this.delete}>delete</button>
                <button id=${dcmnt["id"]} @click=${this.loadUpdateView}>update</button>
              </div>
              <div class="cell">${dcmnt["make"]}</div>
              <div class="cell">${dcmnt["model"]}</div>
              <div class="cell">${dcmnt["color"]}</div>
            </div>
          `;
        })}
      </div>
      <p>A <em>'Collection'</em> in Firestore is perhaps analagous to a table, in SQL-land</p>
      <p>A <em>'Document'</em> in Firestore is perhaps analagous to the <em>row</em> of a table, in SQL-land</p>
    `;
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        button {
          padding: 1em;
          margin-bottom: 2em;
        }
        .table .row {
          display: grid;
          grid-gap: 10px;
          padding: 0;
          list-style: none;
          grid-template-columns: auto  1fr 1fr 1fr;
        }
        .cell {
          background: #f9f7f5;
          display: block;
          text-decoration: none;
          padding: 10px;
          text-align: center;
          font-size: 10px;
        }
      `,
    ]
  }
}
