import useClipboard from 'hooks/use-clipboard';
import useShop from 'hooks/use-shop';
import * as React from 'react';
import { IoIosCopy, IoMdCopy } from 'react-icons/io';
import { ProductViewType } from 'typings/product/product-type';
import { formatPesosMoney } from 'utils/money';
import { proxyURL } from 'utils/urlsigner';

type ProductCardProps = {
  product: ProductViewType
  handleClick?: (e: any) => void
  isChecked?: boolean
  handleShow: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, handleShow }) => {
  const { shop } = useShop();
  const [isCopied, handleCopy] = useClipboard(`https://${shop?.permanent_domain}/products/${product.handle}`,);
  const statusColor = stock => {
    if (stock > 0) {
      return 'bg-green-100 text-green-600';
    }
    return 'bg-red-100 text-red-600';
  };
  const { image_url, title } = product;
  return (
    <>
      <div className="flex-shrink-0 w-[48px] h-[48px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden">
        <img
          src={proxyURL(image_url, 50, 50)}
          alt={title || ''}
          onClick={() => handleShow()}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="ml-2 flex-1 flex flex-col pl-2">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <div>
              <div className='flex'>
                {title}
                {!!shop && <span className='ml-2'>
                  <IoIosCopy className="text-gray-500 w-4 h-4 cursor-pointer" onClick={handleCopy} />
                </span>}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded text-center py-0.5 px-2 ${statusColor(
              product.num_in_stock
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
