import React, { useState, useEffect } from 'react';
import Product from './product-item';
import ProductList from './mobile/product-list';
import EmptyState from 'partials/empty-state';
import { useNavigate } from 'react-router-dom';
import { ProductViewType } from 'typings/product/product-type';

type ProductsTableProps = {
  selectedItems: (items: string[]) => void
  handleShow: (show: boolean) => void
  products: ProductViewType[]
}

const ProductsTable: React.FC<ProductsTableProps> = ({ selectedItems, handleShow, products }) => {
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(products?.map(li => li.product_id) ?? []);
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
        <div className="border border-transparent focus:outline-none rounded-md shadow-lg bg-white appearance-none relative">
          <ProductList handleShow={handleShow} products={products} />
          <div className="hidden md:block">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50">
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
                      <div className="font-semibold text-left">Product</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Inventory</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Type</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Status</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold">Variants</div>
                    </th>
                    {/* <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
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
                        product={product}
                        selectedItems={selectedItems}
                        handleShow={() =>
                          navigate(`/shop/products/${product.product_id}`)
                        }
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
              navigate('/shop/products/new');
            },
          }}
        />
      )}
    </>
  );
}

export default ProductsTable;
