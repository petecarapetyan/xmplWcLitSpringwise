
import { createModel } from "@captaincodeman/rdx-model";
import { Store, State } from "../store";
import { firestoreLoader } from "../../firebase";
//REPLACEMENTS0
            import { TruckDcmnt } from "./truck"
            import { AirplaneDcmnt } from "./airplane"
            import { DogDcmnt } from "./dog"

// Please note that this default export of createModel() is re-exported
// as delta in ../ index.ts, then consumed by getState() below
// as state.delta.
// This could be confusing, even if it does make perfect sense, eventually

const allCollections: string[] = [
  //REPLACEMENTS1
            "truck",
            
            
            "airplane",
            
            
            "dog",
            
            
];
export default createModel({
  state: {},

  reducers: {},

  effects: (store: Store) => ({
    async nullAllExcept(_running: string[]) {
      console.log(store)//to keep ts lint from complaining
      const db = await firestoreLoader;
      allCollections.forEach(collection => {
        if (!_running.includes(collection)) {
          let ref = db.collection(collection);
          if (ref!!) {
            ref.onSnapshot(() => {});
            console.log("DETACHING ", collection);
          }
        }
      });
    },

    // sure does seem like this below could be refactored if I wasn't too lazy
    //REPLACEMENTS2

            async truck() {
              const db = await firestoreLoader;
              let ref = db.collection("truck");
              if (ref!!) {
                const dispatch = store.dispatch();
                dispatch.retrieve.nullAllExcept(["truck"]);
                ref.onSnapshot(snapshot => {
                  console.log("INSTANTIATING Truck");
                  let changes = snapshot.docChanges();
                  changes.forEach(change => {
                    if (change.type == "added") {
                      const dcmnt: TruckDcmnt = {
                        id: change.doc.id,
                        motor: change.doc.data()["motor"],
                        model: change.doc.data()["model"],
                        manufacturer: change.doc.data()["manufacturer"],
                        color: change.doc.data()["color"],
                      };
                      dispatch.truck.upsert(dcmnt);
                    }
                    if (change.type == "removed") {
                      dispatch.truck.deleteDcmnt(change.doc.id);
                    }
                  });
                });
              }
            },        
            

            async airplane() {
              const db = await firestoreLoader;
              let ref = db.collection("airplane");
              if (ref!!) {
                const dispatch = store.dispatch();
                dispatch.retrieve.nullAllExcept(["airplane"]);
                ref.onSnapshot(snapshot => {
                  console.log("INSTANTIATING Airplane");
                  let changes = snapshot.docChanges();
                  changes.forEach(change => {
                    if (change.type == "added") {
                      const dcmnt: AirplaneDcmnt = {
                        id: change.doc.id,
                        make: change.doc.data()["make"],
                        model: change.doc.data()["model"],
                        color: change.doc.data()["color"],
                      };
                      dispatch.airplane.upsert(dcmnt);
                    }
                    if (change.type == "removed") {
                      dispatch.airplane.deleteDcmnt(change.doc.id);
                    }
                  });
                });
              }
            },        
            

            async dog() {
              const db = await firestoreLoader;
              let ref = db.collection("dog");
              if (ref!!) {
                const dispatch = store.dispatch();
                dispatch.retrieve.nullAllExcept(["dog"]);
                ref.onSnapshot(snapshot => {
                  console.log("INSTANTIATING Dog");
                  let changes = snapshot.docChanges();
                  changes.forEach(change => {
                    if (change.type == "added") {
                      const dcmnt: DogDcmnt = {
                        id: change.doc.id,
                        name: change.doc.data()["name"],
                        breed: change.doc.data()["breed"],
                        age: change.doc.data()["age"],
                      };
                      dispatch.dog.upsert(dcmnt);
                    }
                    if (change.type == "removed") {
                      dispatch.dog.deleteDcmnt(change.doc.id);
                    }
                  });
                });
              }
            },        
            

  })
});

export const getState = (state: State) => state.retrieve;
