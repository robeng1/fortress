import { PayloadAction } from '@reduxjs/toolkit';

export interface Err {
  action: PayloadAction<any>;
  error: string;
}
