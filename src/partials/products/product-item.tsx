import React from 'react';
import { ProductViewType } from 'typings/product/product-type';
import { proxyURL } from 'utils/urlsigner';

type ProductTableItemProps = {
  selectedItems: (items: string[]) => void
  handleShow: (show: boolean) => void
  handleClick: (e: any) => void
  isChecked: boolean
  product: ProductViewType
}

const ProductTableItem: React.FC<ProductTableItemProps> = ({ product, selectedItems, handleShow, handleClick, isChecked }) => {
  const statusColor = status => {
    switch (status) {
      case 'Not tracked':
        return 'bg-green-100 text-green-600';
      case '0 in stock':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-green-100 text-green-600';
    }
  };
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              id={product.product_id}
              className="form-checkbox"
              type="checkbox"
              onChange={handleClick}
              checked={isChecked}
            />
          </label>
        </div>
      </td>
      <td
        onClick={() => handleShow(false)}
        className="cursor-pointer hover:underline px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 flex-shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded"
              src={proxyURL(product.image_url, 50, 50)}
              alt={product.title}
            />
          </div>
          <div className="font-medium text-gray-800">{product.title}</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div
          className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
            `${product.num_in_stock} in stock`,
          )}`}
        >
          ${product.num_in_stock} in stock
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="text-left">{product.categories[0]}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="text-left">{product.product_status || 'Available'}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="text-center">{product.num_variants}</div>
      </td>
    </tr>
  );
}

export default ProductTableItem;
