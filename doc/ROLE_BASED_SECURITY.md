# ROLE_BASED_SECURITY
 
The egg consumes a JWT (currently firebase, but eventually others as well - see below) for providing role based security.

JWT (https://jwt.io/introduction/) JSON Web Token is a universal standard.

## What is the "claims" terminology?

`Custom Claims` is the lingo used in the JWT world for the JSON object, or "token" which is passed around to clients and back ends.

## What goes in a JWT?

There is a ton of great online doc on this. _**In this doc, we just use it for roles**_, as per the example below. It is really important that you understand what NOT to put in a JWT, so read the voluminous documentation before you get enthusiastic and do something self destructive.

## Do JWTs store in my DB?

You are not allowed to concern yourself with that implementation detail. Main thing is you consume your auth's JWT API. Where it persists it, and how, is not of your concern - or at least for the purposes of this doc.

## What does security mean, in this context?

There is no such thing as a "secure" web app run on javascript. Dev tools allow any knowledgable user to do anything they want within an app's javascript.

Given that security is more just a word for security-like-behavior, what role based security means to the egg is an easy way to control visibility. Visibility, in this context, is a surrogate for security.

## How is real security provided to the app?

The same JWT which the client app uses to control visibility is also used for true security on the back end.

True security is provide by the back end, at both the persistence layer, and also in access to back end functions.

True security is created by preventing the user from being sent the wrong data, or being given access to the wrong service/function. Again, this happens on the back end, and repeating for emphasis - this too is controled by the same JWT that we use on the front end.

## How does the app use the JWT to control visibility?

Given: User is in the moderator group, which should giv him/her access to the moderator pages and widgets.

Then: This html attribute can be used to easily control visibility:

```html
<div if-moderator> .. content here ... </div>
```

Similarly, if there is content that should only be shown if user is NOT a moderator:

```html
<div if-not-moderator> .. content here ... </div>
```

Seems too easy? Yup, it's that easy

## What does the JWT look like, then?

A JWT with the classic 4 groups that the egg starts with looks like this:


```json

claims = {
          user: true,
          moderator: true,
          admin: false,
          superadmin: false
        }
```

See how small that is? Important! Read those JWT docs!

## Why the crazy listing of all 4 possible roles?

Why not just list the highest role? In other words, if you're an admin, silly to say that you are also a moderator and user!

IT IS NOT A GIVEN that a role includes lower roles!

You could be an admin, for example, and not be a moderator. This becomes more apparent when other roles not showing are added, _for example you could have an analyst role which has no other responsibilities_, just like a moderator.

For this reason, we must indicate each possible role as a true or false, for clarity and deterministic behavior in all edge cases.

## What systems are required for JWT?

JWT are furnished to both front end and back end systems such as DB, storage, and services such as functions or lamda.

Any of a dozen or more auth systems could provide JWTs and their related APIs.

Our default system is firebase for JWTs. But some other examples might be:

- firebase
- Laravel Passport
- cognito?

## How do I get started? No-one has access to change permissions!

This assumes you have app up and running in local dev, and also functions deployed, as documented elsewhere such as firebase docs.

1. Before you deploy your functions, you MUST change the owner to the correct user. Search for this string `const isHardCodedMasterUser = context.auth.token.email` and change the email address according to the owning dev's google acct.
1. If you have ANY users that logged in before you deployed your functions, they will have to be deleted from the firebase instance as users! If you don't do this you may end up being very confused for a long time until you find this in the documentation.
1. From localhost dev instance temporarily remove `if-superadmin` attribute on the permissions html form 
1. log in as the same user that is set in the functions as `isHardCodedMasterUser`
1. Use this to set your initial superadmins as preferred
1. Change the UI code back! See above.
1. You can use `https://console.firebase.google.com/` to your project > functions > logs to observe call into functions if required.
1. Pick a different user and change that user to each role, then manual testing the visibility tests in the about page for that role and that user.

## What about when I want to add/subtract roles?

_If there are already users/roles in the system these instructions should be custom modified accordingly:_ That could get pretty hairy, too much so to document here.

Roles are _**hard-coded in different places.**_ Do not expect to just make a change in one place and have it ripple.

1. You must add/subtract roles in the back end - default is firebase functions.
2. You also need to add/subtract same roles in the file where you define your css variables/properties
3. _nothing in rdx model? Need to confirm. Commenting out now_

## What is the easiest heuristic for finding all the hard-coded roles?

The easiest thing to do is string search for `superadmin`

## How to manually test you role changes?

Copypasting code can be misleading in this situation. Few tips:

_Below is described assuming a firebase JWT auth provider:_

- It is helpful to have different chrome users each with different [google] logins, and one or two without a [google] login
- Keep them all open at once, each to same localhost url 
- Test each change with all users
- Uncomment code with this string: `console.log("SETTING ", role,` during the debugging process
- Use the above to monitor dev tools to see which user logging in with which claims
- Changes don't show? Log out then log back in to test role based permissions with each user
- Keep at least one browser window open to the same hard-coded user provided as your root firebase user, also hard coded. Search for this string `const isHardCodedMasterUser = context.auth.token.email`
- Create content such as on home page to test out many roles to test each variation of if-yadarole or if-not-yadarole
- Give different users different role based permissions
- Follow reasonable precautions to return all users to appropriate roles when testing is complete

If personal experience is any guide, more things can go wrong than you might initiall expect. Be sure to test every edge case you can think of, as self defense.

## Some examples of edge cases?

- upgrading and then downgrading users/roles
- giving different roles superadmin and making sure they can do the work
- both if-yadarole and if-not-yadarole
- checking each role, not just one or two
- not logged in
- what happens if you combine multiple `if-not-yada` and/or `if-yada` roles?

## Hey! I don't get how the code sets the css vars that handle visibility!

Glad you asked. Search for this string: `document.documentElement.style.setProperty(`
