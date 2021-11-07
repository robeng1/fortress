import { RootState } from 'types';

export const loadState = () => {
  try {
    const serialState = localStorage.getItem('app-state');
    if (serialState === null) {
      return undefined;
    }
    return JSON.parse(serialState);
  } catch (err) {
    // TODO: find smth better to do with this error
    return undefined;
  }
};
export const saveState = (state: RootState) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem('app-state', serialState);
  } catch (err) {
    // TODO: find smth better to do with this error
    console.log(err);
  }
};
