import { useReducer, useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import { projectFirestore } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { ...state, isPending: true };
    case "ADDED_DOCUMENT":
      return { ...state, isPending: false, document: action.payload };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const ref = projectFirestore.collection(collection);

  //only dispatch if is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add document to collection
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedDocument = await ref.add({ doc });
      
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {}
  };

  //delete document from collection
  const deleteDocument = async (id) => {};

  //cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
