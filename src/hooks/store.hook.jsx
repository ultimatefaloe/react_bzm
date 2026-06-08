// FIX SUMMARY FOR JUNIOR DEVELOPERS:
// ─────────────────────────────────────────────────────────────────
// ERROR 1: Hooks (useState, useEffect) were called INSIDE regular functions (getData).
//          React hooks must ONLY be called at the top level of a custom hook or component.
//          Calling them inside nested functions causes: "Invalid hook call" error.
//
// ERROR 2: useStore returned a plain object `=> ({...})` instead of running as a hook.
//          This means React never treated it as a hook, so hook rules were violated.
//
// ERROR 3: getData() was called inside setData, updateData, removeData, clearData
//          but getData is a property on the object, not a standalone function.
//          This causes: "getData is not defined" ReferenceError.
//
// ERROR 4: In clearData(), `key` was referenced but never received as a parameter.
//          This causes: "key is not defined" ReferenceError.
//
// ERROR 5: updateData() didn't handle the case where existingData is null/undefined.
//          newData would remain undefined and localStorage would store "undefined".
//
// ERROR 6: Unused import `use` was imported from react.
// ─────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react"; // FIX 6: Removed unused `use` import

export const useStore = (key) => { // FIX 1+2: useStore is now a proper hook function (not an object),
                                   // and `key` is accepted at the top level so hooks can use it

  // FIX 1: useState and useEffect are now at the TOP LEVEL of the hook — not inside nested functions
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(null);
    }
  }, [key]); // re-runs whenever key changes

  // FIX 3: Helper to sync state after any localStorage mutation
  //        Previously, getData() was called inside other methods but was never
  //        in scope as a standalone function — caused "getData is not defined"
  const syncData = () => {
    const storedData = localStorage.getItem(key);
    setData(storedData ? JSON.parse(storedData) : null);
  };

  const getData = () => {
    // Simply returns current state — no hooks needed here
    return data;
  };

  const setStoredData = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    syncData(); // FIX 3: use syncData() instead of calling getData()
  };

  const updateData = (value) => {
    const existingData = localStorage.getItem(key);

    // FIX 5: Added fallback to `value` when existingData is null,
    //        preventing newData from being undefined and storing "undefined" in localStorage
    const newData = existingData
      ? { ...JSON.parse(existingData), ...value }
      : value;

    localStorage.setItem(key, JSON.stringify(newData));
    syncData(); // FIX 3
  };

  const removeData = () => {
    localStorage.removeItem(key);
    syncData(); // FIX 3
  };

  const clearData = () => { // FIX 4: Removed `key` parameter — key is already in scope from the hook
    localStorage.clear();
    setData(null); // after clearing all storage, state should be null
  };

  return { data, getData, setStoredData, updateData, removeData, clearData };
};