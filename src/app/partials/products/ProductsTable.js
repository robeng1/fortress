import React, { useState, useEffect } from 'react';
import { focusHandling } from 'cruip-js-toolkit';
import Product from './ProductTableItem';
import ProductList from './mobile/ProductList';
import EmptyState from 'app/partials/EmptyState';
function ProductsTable({ selectedItems, handleShow, products }) {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  useEffect(() => {
    focusHandling('outline');
  }, [products]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(products.map(li => li.product_id));
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
      {products.length > 0 ? (
        <div className="border border-transparent focus:outline-none rounded shadow bg-white appearance-none relative">
          <ProductList handleShow={handleShow} products={products} />
          <div className="hidden md:block">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50">
                  <tr>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
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
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Product</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Inventory</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Type</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Status</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold">Variants</div>
                    </th>
                    {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th> */}
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-gray-200">
                  {products.map(product => {
                    return (
                      <Product
                        key={product.product_id}
                        id={product.product_id}
                        image={product.image_url}
                        name={product.title}
                        inventory={`${product.num_in_stock} in stock`}
                        type={product.product_type}
                        status={product.product_status}
                        variants={product.num_variants}
                        fav={false}
                        handleShow={() => handleShow(true, product.product_id)}
                        handleClick={handleClick}
                        isChecked={isCheck.includes(product.product_id)}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          heading="No products yet"
          msg="Create some products to get started"
          action={{
            name: 'Create product',
            func: () => {
              handleShow(true, '');
            },
          }}
        />
      )}
    </>
  );
}

export default ProductsTable;
