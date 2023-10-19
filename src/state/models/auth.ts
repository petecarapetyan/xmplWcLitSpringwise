import { createModel } from "@captaincodeman/rdx-model";
import { State, Store } from "../store";
import { createSelector } from "reselect";
import { authLoader, functionsLoader } from "../../firebase";
// this whole claims thing is awkward but works
// keep an eye on Simon's code for revisions

export interface EmailRole {
  email: string;
  role: string;
}

export interface User {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

export interface AuthState {
  user: User | null;
  claims: any;
  statusKnown: boolean;
  busy: boolean;
  message: string;
}

/*
This is where you put the changes that determine all of your roles.

Be sure to test any changes carefully! See markdown docs for advice.
*/
const roles = ["user", "moderator", "admin", "superadmin"];
const updateDisplayFromClaims = (claims: any) => {
  for (const role in claims) {
    if (roles.includes(role)) {
      // console.log("SETTING ", role, claims[role]) // uncomment to debug roles
      document.documentElement.style.setProperty(
        `--display-if-${role}`,
        claims[role] ? "block" : "none"
      );
    }
    if (roles.includes(role)) {
      document.documentElement.style.setProperty(
        `--display-if-not-${role}`,
        claims[role] ? "none" : "block"
      );
    }
  }
};

/*
All rdx models have this primary functionality
This particular model is more helpful than most 
in that it is rich with actual examples to use 
as a pattern for your own rdx models.
*/
export default createModel({
  state: <AuthState>{
    user: null,
    statusKnown: false
  },

  reducers: {
    signedIn(state, user: User) {
      return { ...state, user, statusKnown: true };
    },

    signedOut(state) {
      return { ...state, user: null, statusKnown: true };
    },

    roleRequested(state) {
      return { ...state, busy: true };
    },

    message(state, message) {
      return { ...state, busy: false, message: message };
    }
  },

  effects: (store: Store) => ({
    async signout() {
      const auth = await authLoader;
      await auth.signOut();
    },

    async signinProvider(name: string) {
      const auth = await authLoader;
      const provider = providerFromName(name);
      await auth.signInWithRedirect(provider);
    },

    async modifyUserRoles(data: EmailRole) {
      const dispatch = store.dispatch();
      dispatch.auth.roleRequested();
      const auth = await authLoader;
      const currentUser = await auth.currentUser;
      if (currentUser) {
        const tokenResult = await currentUser.getIdTokenResult();
        if (tokenResult) {
          const claims = tokenResult.claims;
          updateDisplayFromClaims(claims);
          const functions = await functionsLoader;
          // Looking for where it calls out to JWT api? Here:
          const addMessage = functions.httpsCallable("modifyUserRoles");
          const result = await addMessage({
            email: data.email,
            role: data.role
          });
          returnMessage(dispatch, result);
        }
      }
    },

    /* Leave this comment set in - might need it! */
    // to support signing in with other methods:
    // async signinEmailPassword(payload: { email: string, password: string }) {
    //   const auth = await authLoader
    //   await auth.signInWithEmailAndPassword(payload.email, payload.password)
    // },

    /*
    In case this is confusing, when logging in, it is not enough 
    to just get the current user stuff.
    We need the custom claims token, as well
    That's what this does.
    */
    async init() {
      const auth = await authLoader;
      const dispatch = store.dispatch();
      dispatch.auth.message("");
      auth.onAuthStateChanged(async user => {
        if (user) {
          const currentUser = await auth.currentUser;
          if (currentUser) {
            const tokenResult = await currentUser.getIdTokenResult();
            if (tokenResult) {
              const claims = tokenResult.claims;
              updateDisplayFromClaims(claims);
            }
          }
          dispatch.auth.signedIn(user);
        } else {
          dispatch.auth.signedOut();
        }
      });
    }
  })
});

function returnMessage(dispatch, result) {
  if (result !== null && result.data !== null) {
    dispatch.auth.message(result.data);
  }
}

function providerFromName(name: string) {
  switch (name) {
    case "google":
      return new window.firebase.auth.GoogleAuthProvider();
    // TODO: add whatever firebase auth providers are supported by the app
    // case 'facebook': return new window.firebase.auth.FacebookAuthProvider();
    // case 'twitter': return new window.firebase.auth.TwitterAuthProvider();
    default:
      throw `unknown provider ${name}`;
  }
}

/* critical boilerplate common to all rdx models */
const getState = (state: State) => state.auth;


export namespace AuthSelectors {
  export const user = createSelector(
    [getState],
    state => state.user
  );

  export const statusKnown = createSelector(
    [getState],
    state => state.statusKnown
  );

  export const anonymous = createSelector(
    [user],
    user => user === null
  );

  export const authenticated = createSelector(
    [user],
    user => user !== null
  );

  export const busy = createSelector(
    [getState],
    auth => auth.busy
  );

  export const message = createSelector(
    [getState],
    auth => auth.message
  );
}
