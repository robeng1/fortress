import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType, RegisterLogInType } from 'app/models/user/profile';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import userSaga from './saga';
import { UserErrorType } from './types';

const userNamespace = 'user';

export type UserState = {
  user: {};
  session: {};
  profile: ProfileType;
  isAuthenticated: boolean;
  loading: boolean;
  error?: UserErrorType | null;
};

export const initialState: UserState = {
  user: {},
  profile: {},
  session: {},
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: userNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    isAuthenticated: state => {
      state.error = null;
      state.loading = true;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      state.error = null;
      state.loading = false;
    },
    signup: (state, action: PayloadAction<RegisterLogInType>) => {
      state.error = null;
      state.loading = true;
    },
    login: (state, action: PayloadAction<RegisterLogInType>) => {
      state.error = null;
      state.loading = true;
    },
    logout: state => {
      state.error = null;
      state.loading = true;
    },
    sessionLoaded: (state, action: PayloadAction<{}>) => {
      state.session = action.payload;
      state.error = null;
      state.loading = false;
    },
    loadProfile: (state, action: PayloadAction<string>) => {
      state.error = null;
      state.loading = true;
    },
    updateProfile: (state, action: PayloadAction<ProfileType>) => {
      state.error = null;
      state.loading = true;
    },
    profileLoaded: (state, action: PayloadAction<ProfileType>) => {
      state.profile = action?.payload;
      state.error = null;
      state.loading = false;
    },
    setUser: (state, action: PayloadAction<{}>) => {
      state.user = action?.payload;
      state.error = null;
      state.loading = false;
    },
    userError(state, action: PayloadAction<UserErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
      state.loading = false;
    },
  },
});

export const { actions: userActions, reducer } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userSaga });
  return { actions: slice.actions };
};
