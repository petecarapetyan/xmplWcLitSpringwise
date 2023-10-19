# FORMS_STRATEGY

## _**Why**_ even have a forms strategy?

- Maintainable
- Reduce custom code
- Standardized or consistent
- Good enough
- Frees devs up to work on more important features
- Forms are easy to go back and customize later, in the visual enhancement phase.

All of the above isn't to say that a team wouldn't want more perfect non-standard code later in a project's development.

Instead the idea is to delay the super custom unique snowflake forms as long as possible in the project's development, to put the team's efforts to better use elsewhere.

## What are the basic components of the forms strategy?

1. Simple and dumb wins - less fancy stuff is better.
2. Use only boilerplate class-free CSS such as water.css
3. Do as much validation at the html level as possible, without JS.
4. Consume form submit, not button @click, and use simple boilerplate consistently.

## But, is html-only validation really workable?

Form validation through simple HTML attributes is not as powerful as JS.

But you might be surprised how much you can do with very little effort, for example:

- https://www.w3schools.com/tags/att_input_pattern.asp
- https://www.w3schools.com/tags/att_input_required.asp

## External experiments

One of the biggest opportunities is form validation on form input submit. But this requires the ability to make that work, and then have the field values later, to use for something such as a fetch.

We (Pete and Andy) did some external experiments to try different approaches. 

This is the experiment that seemed to work:
 - https://webcomponents.dev/edit/inimDEloWWcwyyrG9Y7B

These two worked but either didn't work the same within our app, or we chose otherwise:
- https://webcomponents.dev/edit/wTmsnaVpjSZqWqzeXvsA
- https://webcomponents.dev/edit/b2gtbNe8bcA300ffFRyk

## Permissions form as initial standard:

We need an example form that would stay with the project and always remain as a good source of sample code.

The form used to grant user permissions was chosen for this purpose.

- An easy form
- Only used by _superadmin_, so plain is more easily palatable on this form
- Used by every app so remains as a standard example for all apps 
- Submit requires an external call, so we get to code around that delay

## Other notes

- surrounding the form with a fieldset attribute seemed to make the otherwise plain style more tolerable
- coupling the form processing with an easy to use redux-thunk like pattern seemed helpful
- there seems to be no code free way to automatically iterate through all fields (although one example above shows it using lots of code)