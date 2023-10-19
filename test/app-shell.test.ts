import { html, fixture, expect } from "@open-wc/testing";

import '../src/wc/app-shell';

describe("ShellComponent", () => {
    let element;
    beforeEach(async () => {
        element = await fixture(html`
            <shell-component></shell-component>
        `);
    });

    it("passes the a11y audit", async () => {
        await expect(element).shadowDom.to.be.accessible();
    });
});
