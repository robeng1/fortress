import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectOrderViews } from 'app/features/order/selectors';
import OrderCard from './OrderCard';

export default function OrderList({ handleShow }) {
  const orders = useSelector(selectOrderViews);
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
