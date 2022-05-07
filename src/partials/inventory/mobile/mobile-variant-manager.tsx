import * as React from 'react';
import { InventoryViewType } from 'typings/inventory/inventory-type';
import { pesosRawMoney } from 'utils/money';
import { proxyURL } from 'utils/urlsigner';

type MobileVariantManagerProps = {
  handleClick?: (e: any) => void
  isChecked?: boolean,
  product: InventoryViewType
}

const MobileVarianManager: React.FC<MobileVariantManagerProps> = ({ product }) => {
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
  const { image_url, price_excl_tax, title, num_in_stock } = product;
  return (
    <>
      <div className="flex-shrink-0 w-[48px] h-[48px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden">
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
              <a href="/">{title}</a>
            </h3>
          </div>
        </div>
        <div className="flex justify-between align-bottom text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded-full text-center py-0.5 ${statusColor(
              num_in_stock,
            )}`}
          >
            {num_in_stock}
          </p>
          <p className="mt-1 ml-4 text-sm text-gray-500 py-0.5">{pesosRawMoney(price_excl_tax)}</p>
        </div>
      </div>
    </>
  );
}

export default MobileVarianManager;
