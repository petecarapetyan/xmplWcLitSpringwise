import { createModel } from '@captaincodeman/rdx-model'
import { State, Store  } from '../store'
import { createSelector } from 'reselect'
import { firestoreLoader } from "../../firebase";

// dcmnt and clctn almost act like keywords, in this context
// They are also used as suffix, such as TruckDcmnt
// dcmnt (document) is used in this context as you would a record or a row in a database. Corresponds to `document` in firestore
// clctn (collection) is used in this context as you would a table in a database. Corresponds to a `collection` in firestore
// field, fields, type are used as document attributes, and corresponds to the elements of a schema as you would find in a database schema, as well as fields in a firestore document

export interface TruckDcmnt {
    id: string,
    motor:  | null,
    model:  | null,
    manufacturer:  | null,
    color:  | null,
}


// Please note that this default export of createModel() is re-exported
// as truck in ../ index.ts, then consumed by getState() below
// as state.truck.
// This could be confusing, even if it does make perfect sense, eventually
export default createModel({
  state: {
    focusDcmnt: {},
    truckClctn: {},
  },

  reducers: {
    truckClctn(state, truckClctn) {
      return { ...state, truckClctn };
    },
    focusDcmnt(state, focusDcmnt) {
      return { ...state, focusDcmnt };
    },
    upsert(state, dcmnt) {
      const truckClctn = state.truckClctn;
      truckClctn[dcmnt.id] = dcmnt;
      return { ...state, truckClctn };
    },
    deleteDcmnt(state, key: string) {
      const truckClctn = state.truckClctn;
      delete truckClctn[key];
      return { ...state, truckClctn };
    }

  },


  effects: (store: Store) => ({
    async create(data: TruckDcmnt) {
      const db = await firestoreLoader;
      db.collection("truck")
        .add({
          motor: data.motor,
          model: data.model,
          manufacturer: data.manufacturer,
          color: data.color,
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
          window.location.replace("/truckRD")
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },

    async delete(key: string) {
      const dispatch = store.dispatch();
      const db = await firestoreLoader;
      if (!!key ) {
        const ref = db.collection("truck").doc(key)
        if (!!ref) {
            ref.delete()
            .then(function (_deleted) {
              console.log("Deleted ID: ", key);
              dispatch.truck.deleteDcmnt(key);
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
      let ref = db.collection("truck").doc(key);
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
                  const dcmnt: TruckDcmnt = {
                    id: key,
                      motor: data["motor"],
                      model: data["model"],
                      manufacturer: data["manufacturer"],
                      color: data["color"],
                  };
                  window.location.replace("/truckU")
                  dispatch.truck.focusDcmnt(dcmnt);
                }
              }
            })
            .catch(err => {
              console.log('Error getting documents', err);
            });
        }
    },

    async updateDcmnt(data: TruckDcmnt) {
      const db = await firestoreLoader;
      const key: string = data.id;
      if (!!key ) {
        const ref = db.collection("truck").doc(key)
        if (!!ref) {
            ref.update(data)
            .then(function (_key) {
              window.location.replace("/truckRD")
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

// see ../index.ts for where state.truck below,
// is defined using default export from above
const getState = (state: State) => state.truck

// creates methods such as `TruckSelectors.someval(state)`
// which would typically return state.someval
export namespace TruckSelectors {
  export const dcmntFocus = createSelector(
    [getState],
    (state) => state.focusDcmnt
  )
  export const truckClctn = createSelector(
    [getState],
    (state) => state.truckClctn
  )
}
