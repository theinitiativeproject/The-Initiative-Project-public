export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    console.log('error saving state');
  }
};

export const loadState = () => {
  try {
    const serializedSavedState = localStorage.getItem('state');
    return serializedSavedState === null
      ? {}
      : JSON.parse(serializedSavedState);
  } catch (err) {
    console.log(err);
    return {};
  }
};
