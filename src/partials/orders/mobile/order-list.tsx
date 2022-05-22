import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { OrderViewType } from 'typings/order/order-type';
import OrderCard from './order-card';
type OrderListProps = {
  selectedItems: (items: string[]) => void
  orders: OrderViewType[]
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="md:hidden">
        <div className="mt-8">
          <div className="flow-root">
            <ul className="p-3 divide-y divide-gray-200  -mt-5">
              {orders.map(order => (
                <li key={order.order_id} className="flex pr-3 py-2">
                  <OrderCard handleShow={() => navigate(`/orders/${order.order_id}`)} order={order} />
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