import { customElement, html, LitElement, css } from 'lit-element'
import style from "../css/shared.css";
import { cssVars } from '../css/css-vars'

declare global {
  interface HTMLElementTagNameMap {
    'view-home': ViewHomeElement
  }
}

@customElement('view-home')
export class ViewHomeElement extends LitElement {

  render() {
    return html`
      <h1>How To FIXME:</h1>
      <p>Welcome to your egg-starter app &hellip;</p>
      <p>Read the <a href="/about">about</a> page for next steps</p>
    `
  }

  
  static get styles() {
    return [
      cssVars,
      style,
      css`
        :host {
          display: flexbox;
          text-align: center;
        }
      `
    ];
  }
}
