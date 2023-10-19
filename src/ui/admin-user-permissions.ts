import { html, customElement, css, property } from "lit-element";
import { Connected } from "./connected";
import style from "../css/shared.css";
import { cssVars } from "../css/css-vars";
import { EmailRole, AuthSelectors } from "../state/models/auth";
import { dispatch, State } from "../state";

@customElement("admin-user-permissions")
export class AdminUserPermissions extends Connected {
  @property({ type: Boolean }) busy: boolean = false;
  @property({ type: String }) message: string = "";

  mapState(state: State) {
    return {
      busy: AuthSelectors.busy(state),
      message: AuthSelectors.message(state)
    };
  }

  firstUpdated() {
    dispatch.auth.message("");
    const shadowRoot = this.shadowRoot;
    if (shadowRoot !== null) {
      const form = shadowRoot.getElementById("my-form");
      if (form !== null) {
        form.onsubmit = (e: Event) => {
          e.preventDefault();
          this.submit(form);
        };
      }
    }
  }

  submit(form) {
    const emailRole: EmailRole = {
      email: form["email"].value,
      role: form["role"].value
    };
    dispatch.auth.modifyUserRoles(emailRole);
  }

  /*
  This form is THE boilerplate standard for forms in this app.
  Please consult /doc/FORMS_STRATEGY.md for blow by blow on how and why
  */
  render() {
    return html`
      <div if-not-superadmin>
        <h6>If you need different role-based permissions
        <br>ask your app administrator to do this for you.
        <br><br>Once changed, you will have to log out and then back in, to see changes.
        <br>You might even have to refresh your browser once or twice.</h6>
      </div>
      <div if-superadmin>
        <form id="my-form">
          <fieldset>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="User Email Address"
              required
            />
            <select id="role" name="role" required>
              <option value="">select one</option>
              <option value="user">user</option>
              <option value="moderator">moderator</option>
              <option value="admin">admin</option>
              <option value="superadmin">superadmin</option>
            </select>
            <button type="submit">Request modification of user role</button>
          </fieldset>
        </form>
        <p ?busy=${this.busy}>
          Requesting role modification from remote server, please wait for reply &hellip;
        </p>
        <p ?busy=${this.message !== ""}>${this.message}</p>
      </div>
    `;
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
        p {
          color: red;
          opacity: 0;
          transition: opacity ease-in-out 500ms;
        }
        p[busy] {
          opacity: 1;
        }
      `
    ];
  }
}
