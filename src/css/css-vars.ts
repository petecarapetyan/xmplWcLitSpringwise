import { css } from "lit-element";

export const cssVars = css`
  /* this accomplishes hiding as a surrogate for security */
  /* the real security is always provided by back end */
  /* You have to change all of these manually when your groups change */
  [if-user] {
    display: var(--display-if-user, none);
  }
  [if-admin] {
    display: var(--display-if-admin, none);
  }
  [if-moderator] {
    display: var(--display-if-moderator, none);
  }
  [if-superadmin] {
    display: var(--display-if-superadmin, none);
  }
  [if-not-user] {
    display: var(--display-if-not-user, block);
  }
  [if-not-admin] {
    display: var(--display-if-not-admin, block);
  }
  [if-not-moderator] {
    display: var(--display-if-not-moderator, block);
  }
  [if-not-superadmin] {
    display: var(--display-if-not-superadmin, block);
  }
  /* This is mostly from https://github.com/kognise/water.css */
  /* These vars are consumed in shared.css */
  /* This is a partial list, there are many vars specified that are not defined here, or otherwise */
  :host {
    --background-body: #ffffff;
    --background: #efefef;
    --background-alt: #f7f7f7;

    --selection: #9e9e9e;

    --text-main: #363636;
    --text-bright: #000000;
    --text-variable: red;
    --text-muted: #999999;

    --links: #0076d1;
    --focus: #0096bfab;
    --border: #dbdbdb;
    --code: #000000;

    --animation-duration: 0.1s;
    --button-hover: #dddddd;

    --scrollbar-thumb: rgb(213, 213, 213);
    --scrollbar-thumb-hover: rgb(196, 196, 196);

    --form-placeholder: #949494;
    --form-text: #000000;

    --variable: #39a33c;
    --highlight: #ffff00;

    --select-arrow: url("data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' height='62.5' width='116.9' fill='%23161f27'%3E %3Cpath d='M115.3,1.6 C113.7,0 111.1,0 109.5,1.6 L58.5,52.7 L7.4,1.6 C5.8,0 3.2,0 1.6,1.6 C0,3.2 0,5.8 1.6,7.4 L55.5,61.3 C56.3,62.1 57.3,62.5 58.4,62.5 C59.4,62.5 60.5,62.1 61.3,61.3 L115.2,7.4 C116.9,5.8 116.9,3.2 115.3,1.6Z'/%3E %3C/svg%3E");
  }
`;
