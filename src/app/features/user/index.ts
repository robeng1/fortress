import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType } from 'app/models/user/profile';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import userSaga from './saga';
import { UserErrorType } from './types';

const userNamespace = 'user';

export type UserState = {
  user: {};
  profile: ProfileType;
  loading: boolean;
  error?: UserErrorType | null;
};

export const initialState: UserState = {
  user: {},
  profile: {},
  loading: false,
  error: null,
};

export const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: userNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    loadProfile: (state, action: PayloadAction<string>) => {},
    updateProfile: (state, action: PayloadAction<ProfileType>) => {},
    profileLoaded: (state, action: PayloadAction<ProfileType>) => {
      state.profile = action?.payload;
    },
    userError(state, action: PayloadAction<UserErrorType>) {
      state.error = action.payload;
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
