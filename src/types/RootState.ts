// import { ThemeState } from 'styles/theme/slice/types';
import { CollectionState } from 'app/features/collection';
import { DiscountState } from 'app/features/discount';
import { InventoryState } from 'app/features/inventory';
import { OrderState } from 'app/features/order';
import { PaymentState } from 'app/features/payment';
import { ProductState } from 'app/features/product';
import { SettingsState } from 'app/features/settings';
import { UserState } from 'app/features/user';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  // theme?: ThemeState;
  collection?: CollectionState;
  discount?: DiscountState;
  inventory?: InventoryState;
  order?: OrderState;
  payment?: PaymentState;
  product?: ProductState;
  settings?: SettingsState;
  user?: UserState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
