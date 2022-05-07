import * as React from 'react';
import { OrderViewType } from 'typings/order/order-type';
import OrderCard from './order-card';
type OrderListProps = {
  selectedItems: (items: string[]) => void
  handleShow: (show: boolean) => void
  orders: OrderViewType[]
}

const OrderList: React.FC<OrderListProps> = ({ handleShow, orders }) => {
  return (
    <>
      <div className="md:hidden">
        <div className="mt-8">
          <div className="flow-root">
            <ul className="p-3 divide-y divide-gray-200  -mt-5">
              {orders.map(order => (
                <li key={order.order_id} className="flex pr-3 py-2">
                  <OrderCard handleShow={handleShow} order={order} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderList;