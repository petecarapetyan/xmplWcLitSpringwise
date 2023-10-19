import { createModel } from '@captaincodeman/rdx-model'
import { State, Store  } from '../store'
import { createSelector } from 'reselect'
import { firestoreLoader } from "../../firebase";

// dcmnt and clctn almost act like keywords, in this context
// They are also used as suffix, such as DogDcmnt
// dcmnt (document) is used in this context as you would a record or a row in a database. Corresponds to `document` in firestore
// clctn (collection) is used in this context as you would a table in a database. Corresponds to a `collection` in firestore
// field, fields, type are used as document attributes, and corresponds to the elements of a schema as you would find in a database schema, as well as fields in a firestore document

export interface DogDcmnt {
    id: string,
    name:  | null,
    breed:  | null,
    age:  | null,
}


// Please note that this default export of createModel() is re-exported
// as dog in ../ index.ts, then consumed by getState() below
// as state.dog.
// This could be confusing, even if it does make perfect sense, eventually
export default createModel({
  state: {
    focusDcmnt: {},
    dogClctn: {},
  },

  reducers: {
    dogClctn(state, dogClctn) {
      return { ...state, dogClctn };
    },
    focusDcmnt(state, focusDcmnt) {
      return { ...state, focusDcmnt };
    },
    upsert(state, dcmnt) {
      const dogClctn = state.dogClctn;
      dogClctn[dcmnt.id] = dcmnt;
      return { ...state, dogClctn };
    },
    deleteDcmnt(state, key: string) {
      const dogClctn = state.dogClctn;
      delete dogClctn[key];
      return { ...state, dogClctn };
    }

  },


  effects: (store: Store) => ({
    async create(data: DogDcmnt) {
      const db = await firestoreLoader;
      db.collection("dog")
        .add({
          name: data.name,
          breed: data.breed,
          age: data.age,
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
          window.location.replace("/dogRD")
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },

    async delete(key: string) {
      const dispatch = store.dispatch();
      const db = await firestoreLoader;
      if (!!key ) {
        const ref = db.collection("dog").doc(key)
        if (!!ref) {
            ref.delete()
            .then(function (_deleted) {
              console.log("Deleted ID: ", key);
              dispatch.dog.deleteDcmnt(key);
            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });
          }
      } else {
        console.log("PETE YOU EFFED UP")
      }
    },

    async loadUpdateView(key: any) {
      const dispatch = store.dispatch();
      const db = await firestoreLoader;
      let ref = db.collection("dog").doc(key);
        if (ref!!) {
          ref.get()
            .then(doc => {
              if (
                doc !== undefined &&
                doc.data() !== null &&
                doc.data() !== undefined
              ) {
              const data = doc.data();
                if (data != undefined) {
                  const dcmnt: DogDcmnt = {
                    id: key,
                      name: data["name"],
                      breed: data["breed"],
                      age: data["age"],
                  };
                  window.location.replace("/dogU")
                  dispatch.dog.focusDcmnt(dcmnt);
                }
              }
            })
            .catch(err => {
              console.log('Error getting documents', err);
            });
        }
    },

    async updateDcmnt(data: DogDcmnt) {
      const db = await firestoreLoader;
      const key: string = data.id;
      if (!!key ) {
        const ref = db.collection("dog").doc(key)
        if (!!ref) {
            ref.update(data)
            .then(function (_key) {
              window.location.replace("/dogRD")
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });
          }
      } else {
        console.log("PETE YOU EFFED UP")
      }
    },



  })
})

// see ../index.ts for where state.dog below,
// is defined using default export from above
const getState = (state: State) => state.dog

// creates methods such as `DogSelectors.someval(state)`
// which would typically return state.someval
export namespace DogSelectors {
  export const dcmntFocus = createSelector(
    [getState],
    (state) => state.focusDcmnt
  )
  export const dogClctn = createSelector(
    [getState],
    (state) => state.dogClctn
  )
}
