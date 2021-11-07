import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType, RegisterLogInType } from 'app/models/user/profile';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import authnSaga from './saga';
import { UserErrorType } from './types';

const authnNamespace = 'authn';

export type AuthnState = {
  user: {};
  session: {};
  profile: ProfileType;
  isAuthenticated: boolean;
  error?: UserErrorType | null;
};

export const initialState: AuthnState = {
  user: {},
  profile: {},
  session: {},
  isAuthenticated: false,
  error: null,
};

export const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: authnNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    isAuthenticated: state => {
      state.error = null;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      state.error = null;
    },
    signup: (state, action: PayloadAction<RegisterLogInType>) => {
      state.error = null;
    },
    login: (state, action: PayloadAction<RegisterLogInType>) => {
      state.error = null;
    },
    logout: state => {
      state.error = null;
    },
    sessionLoaded: (state, action: PayloadAction<{}>) => {
      state.session = action.payload;
      state.error = null;
    },
    loadProfile: (state, action: PayloadAction<string>) => {
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<ProfileType>) => {
      state.error = null;
    },
    profileLoaded: (state, action: PayloadAction<ProfileType>) => {
      state.profile = action?.payload;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<{}>) => {
      state.user = action?.payload;
      state.error = null;
    },
    userError(state, action: PayloadAction<UserErrorType>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { actions: authnActions, reducer } = slice;

export const useAuthnSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authnSaga });
  return { actions: slice.actions };
};
