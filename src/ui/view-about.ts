import { customElement, html, LitElement, css } from 'lit-element'
import style from "../css/shared.css";
import { cssVars } from '../css/css-vars'

declare global {
  interface HTMLElementTagNameMap {
    'view-about': ViewAboutElement
  }
}

@customElement('view-about')
export class ViewAboutElement extends LitElement {

  render() {
    return html`
      <h1>About:</h1>
      <p>What to do next: </p>
      <p>Section 1 can and should be done quickly </p>
      <p>Section 2 takes a little care and can be put off as required </p>
      <h3>Section 1 - Quick Fixes</h3>
      <ul>
        <li>This won't take long! Take a deep breath, <em><strong>give yourself a half-hour to knock this out:</strong></em></li>
        <li>Open up your new app in the IDE and search for the string 'FIXME'.</li>
        <li>Replace 'FIXME' as appropriate, throughout the codebase.</li>
        <li>You can still leave some things as 'FIXME', such as url to github in the package.json</li>
        <li>Docs, such as they are, are in the '/doc' folder in the codebase</li>
        <li>Please consider taking some extra time to do a quick PR and improve the docs as you move through this process. </li>
        <li>Use the <a href="https://github.com/VictoryCTO/egg-ploppers">egg-ploppers</a>, primarily to add CRUD and page elements quickly.</li>
        <li>You can also use the egg-ploppers to add models and forms, but those are more granular and require more expertise to complete.</li>
        <li>Styling and many other issues should (but might not yet) be addressed in the docs referenced above.</li>
        <li>Your first styling actions might be to change this text from green and the title block from red!</li>
        <li>And don't forget to replace this entire 'about' text block!</li>
      </ul>
      <p>This app will deploy "as is" to the egg-starter firebase and would be viewable as <a href="https://egg-starter.web.app">egg-starter.web.app</a> for confirmation that you are on the right track. Under the rules of engagement for the Platinum Egg team, this is an acceptable action, as egg-starter.web.app is for that exact purpose.</p>
      <p>See the docs for how to paste in the config of your own firebase instance and move off of egg-starter.</p>

      <h3>Section 2 - Role Based Security</h3>

      <p>Instructions: Go to 'doc/ROLE_BASED_SECURITY.md' and find the section titled 'How do I get started? No-one has access to change permissions!'</p>
      <p>Follow these instructions carefully. There be pitfalls here! Missed steps might send you on wild goose chases. Ping Pete for self defense, if the instructions are not clear it is his mess-up</p>
      <p>When you think you are done, use this below, for testing</p>
      <br>
      <p>Save these test paragraphs until you have completed this section!!! </p>
      <p if-user>TEST if-user</p>
      <p if-not-user>TEST if-not-user</p>
      <p if-moderator>TEST if-moderator</p>
      <p if-not-moderator>TEST if-not-moderator</p>
      <p if-admin>TEST if-admin</p>
      <p if-not-admin>TEST if-not-admin</p>
      <p if-superadmin>TEST if-superadmin</p>
      <p if-not-superadmin>TEST if-not-superadmin</p>
      <p>You can delete this section once all the tests are passing!</p>

    `
  }

  
  static get styles() {
    return [
      cssVars,
      style,
      css`
        :host {
          color: green;
        }
      `
    ];
  }
}
