import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './product-card';
import { formatPesosMoney } from 'utils/money';
import { ProductViewType } from 'typings/product/product-type';

type ProductListProps = {
  selectedItems?: (items: string[]) => void
  handleShow: (show: boolean) => void
  products: ProductViewType[]
}

const ProductList: React.FC<ProductListProps> = ({ handleShow, products }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="md:hidden">
        <div className="mt-0">
          <div className="flow-root">
            <ul className="px-3 py-1 divide-y divide-gray-200">
              {products.map(product => (
                <li key={product.product_id} className="flex pr-3 py-2">
                  <ProductCard
                    handleShow={() =>
                      navigate(`/shop/products/${product.product_id}`)
                    }
                    product={product}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;