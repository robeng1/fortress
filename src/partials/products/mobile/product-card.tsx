import * as React from 'react';
import { ProductViewType } from 'typings/product/product-type';
import { formatPesosMoney } from 'utils/money';
import { proxyURL } from 'utils/urlsigner';

type ProductCardProps = {
  product: ProductViewType
  handleClick?: (e: any) => void
  isChecked?: boolean
  handleShow: (show: boolean, id?: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, handleShow }) => {
  const statusColor = status => {
    switch (status) {
      case 'Not tracked':
        return 'bg-green-100 text-green-600';
      case '0 in stock':
        return 'bg-red-100 text-red-600';
      default:
        return '';
    }
  };
  const { image_url, title } = product;
  return (
    <>
      <div className="flex-shrink-0 w-[48px] h-[48px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden">
        <img
          src={proxyURL(image_url, 50, 50)}
          alt={title || ''}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div onClick={() => handleShow(false)} className="ml-2 flex-1 flex flex-col pl-2">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <div>
              <div>{title}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded-full text-center py-0.5 ${statusColor(
              `${product.num_in_stock} in stock}`
            )}`}
          >
            {`${product.num_in_stock} in stock`}
          </p>
          <p className="ml-4 text-sm text-gray-500">{formatPesosMoney(
            product.price_int,
            product.currency,
          )}</p>
        </div>
      </div>
    </>
  );
}

export default ProductCard;