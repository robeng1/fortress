import React, { useState, useEffect } from 'react';
import OrderItem from './OrdersTableItem';
import OrderList from './mobile/OrderList';
import EmptyState from 'partials/EmptyState';
import { formatPesosMoney } from 'utils/money';

function OrdersTable({ selectedItems, handleShow, orders }) {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(orders.map(li => li.order_id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <>
      {orders.length > 0 ? (
        <div className="border border-transparent focus:outline-none rounded-md shadow-lg bg-white appearance-none relative">
          <div>
            <OrderList handleShow={handleShow} orders={orders} />
            {/* Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="table-auto w-full divide-y divide-gray-200">
                {/* Table header */}
                <thead className="text-xs uppercase text-gray-500 bg-gray-50">
                  <tr>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
                      <div className="flex items-center">
                        <label className="inline-flex">
                          <span className="sr-only">Select all</span>
                          <input
                            className="form-checkbox"
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                        </label>
                      </div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Order</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Date</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Customer</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Total</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Status</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold">Items</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Location</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <span className="sr-only">Menu</span>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                {orders.map(order => {
                  return (
                    <OrderItem
                      handleShow={handleShow}
                      key={order.order_id}
                      id={order.order_id}
                      image={order.item_images[0]}
                      order={order.order_id}
                      date={new Date(order.updated_at).toLocaleString()}
                      customer={order.customer_name}
                      total={formatPesosMoney(order.total, order.currency)}
                      status={order.status}
                      location={order.location === "null" ? "Accra" : order.location}
                      items={order.num_items}
                      type={order.order_type}
                      handleClick={handleClick}
                      isChecked={isCheck.includes(order.order_id)}
                    />
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          heading="No orders yet"
          msg="Your orders will appear here as they come in"
        />
      )}
    </>
  );
}

export default OrdersTable;
