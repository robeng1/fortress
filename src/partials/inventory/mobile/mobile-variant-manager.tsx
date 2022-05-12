import useModal from 'hooks/use-modal';
import useShop from 'hooks/use-shop';
import * as React from 'react';
import { InventoryViewType } from 'typings/inventory/inventory-type';
import { mToSFormatted, pesosRawMoney } from 'utils/money';
import { proxyURL } from 'utils/urlsigner';
import VariantEditor from '../editor';

type MobileVariantManagerProps = {
  handleClick?: (e: any) => void
  isChecked?: boolean,
  product: InventoryViewType
}

const MobileVarianManager: React.FC<MobileVariantManagerProps> = ({ product }) => {
  const { isOpen, handleOpen, handleClose } = useModal(false);
  const { shop } = useShop();
  const statusColor = stock => {
    if (stock > 0){
      return 'bg-green-100 text-green-600';
    }
    return 'bg-red-100 text-red-600';
  };
  const { image_url, price_excl_tax, title, num_in_stock } = product;
  return (
    <main className='flex flex-1 cursor-pointer' onClick={handleOpen}>
      <div className="flex-shrink-0 w-[48px] h-[48px] align-middle self-center cursor-pointer justify-center border border-gray-100 rounded-md overflow-hidden">
        <img
          src={proxyURL(image_url, 50, 50)}
          alt={title}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-2 flex-1 flex flex-col pl-2">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <p>{title}</p>
            </h3>
          </div>
        </div>
        <div className="flex justify-between align-bottom text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded text-center py-0.5 px-2 ${statusColor(
              num_in_stock,
            )}`}
          >
            {num_in_stock} In stock
          </p>
          <p className="mt-1 ml-4 text-sm text-gray-500 py-0.5">{mToSFormatted({ amount: price_excl_tax, currency: shop?.currency?.iso_code ?? 'GHS' })}</p>
        </div>
      </div>
      <VariantEditor product={product} isOpen={isOpen} handleOpen={handleOpen} handleClose={handleClose} />
    </main>
  );
}

export default MobileVarianManager;
