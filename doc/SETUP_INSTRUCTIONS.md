In all instances in this repo, `FIXME` means replace with valid string

## This assumes you have already 
- installed the firebase CLI using npm `npm install -g firebase-tools`
- run `firebase login` in your shell
- are comfortable with npm generally, and use nvm to manage npm versions

## How to clone and verify your new app:
- in github, create a new repo using VictoryCTO/vp-starter as a template
- git clone your new repo as per usual
- OPTIONAL - manually search for `FIXME` and replace each as is appropriate

## Connect your Firebase instance to your new repo
- You will need to update 2 files with firebase instance information to connect it to your project. 
    - Goto your firebase project : https://console.firebase.google.com/
        - Goto "Project Overview" > "Project settings" (NOTE: the `Project ID` is located here, you will need it below)
        - In the section "Your Apps" in the area labeled "Firebase SDK snippet" select "Config" you should now see a JSON string that includes attributes such as "apiKey" - copy the _elements_ in the JSON array _not the const/name_
    - Goto your codebase + /src/firebase/config.ts
        - Paste the _elements_ over the ones in the file, the elements should have the same names if you are in the right place.
        - Save
    - Goto your codebase + .firebaserc
        - Paste the Project ID (see above for location) on top of "egg-starter"
        - Save

## Install required modules and launch dev to verify
- from `/` or your project root, run `npm i`
- `cd functions`
- `npm i`
- `cd ..`
- `npm run dev` for a local deploy
- or: `npm run dev` This will deploy your project to the firebase server
- other commands documented elsewhere sometime in the future


## Adding @Victory NPM Components
Go here and follow instructions: https://github.com/VictoryCTO/egg-wc
(Check out the packages directory)
