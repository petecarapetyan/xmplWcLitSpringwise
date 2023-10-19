import { LitElement, customElement, html, css } from "lit-element";

import "./app-view";
import "./auth-status";

import style from "../css/shared.css";
import layoutcss from "../css/left-layout.css";
import { cssVars } from "../css/css-vars";

declare global {
  interface HTMLElementTagNameMap {
    "view-shell": AppShellElement;
  }
}

@customElement("app-shell")
export class AppShellElement extends LitElement {
  render() {
    return html`
      <div class="container">
        <div class="item login">
          <auth-status></auth-status>
        </div>
        <div class="item title">
          <div>
            <h1>FIXME</h1>
            <p>FIXME</p>
          </div>
        </div>
        <div class="item content">
          <app-view></app-view>
        </div>
        <nav class="item extra">
          <ul id="menu-list">
            <li>
              <a href="">Docs</a>
            </li>
            <li>
              <a href="">Reference</a>
            </li>
            <li>
              <a href="">Todos</a>
            </li>
            <li>
              <a href="">Heroes</a>
            </li>
            <li>
              <a href="">Dogs</a>
            </li>
          </ul>
        </nav>
        <nav class="item social">
          <ul id="menu-list">
            <li>
              <a href="">facebook</a>
            </li>
            <li>
              <a href="">linkedin</a>
            </li>
            <li>
              <a href="">reddit</a>
            </li>
            <li>
              <a href="">twitter</a>
            </li>
          </ul>
        </nav>
        <div class="item footer">
          <p>© 2020 FIXME footer content</p>
        </div>
        <nav class="item menu">
          <ul>
            <li id="menu-list"><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/permissions">Permissions</a></li>
                                             <!-- REPLACEMENTS -->
            <li><a href="/truckRD">Truck</a></li>
            <li><a href="/airplaneRD">Airplane</a></li>
            <li><a href="/dogRD">Dog</a></li>
          </ul>
        </nav>
      </div>
    `;
  }

  static get styles() {
    return [
      cssVars,
      layoutcss,
      style,
      css`
        app-view {
          box-sizing: border-box;
          padding: var(--min-padding);
        }

        auth-status {
          height: 56px;
        }

        @media (min-width: 600px) {
          auth-status {
            height: 64px;
          }
        }

      `
    ];
  }
}
