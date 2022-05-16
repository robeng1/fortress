import useClipboard from 'hooks/use-clipboard';
import useShop from 'hooks/use-shop';
import React from 'react';
import { IoIosCopy } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { CollectionViewType } from 'typings/collection/collection-type';
import { proxyURL } from 'utils/urlsigner';

type CollectionTableItemProps = {
  selectedItems: (items: string[]) => void
  handleClick: (e: any) => void
  isChecked: boolean
  collection: CollectionViewType
}

const CollectionItemTable: React.FC<CollectionTableItemProps> = ({ collection: collection, isChecked, handleClick }) => {
  const navigate = useNavigate();
  const { shop } = useShop();
  const [isCopied, handleCopy] = useClipboard(`https://${shop?.permanent_domain}/collections/${collection.handle}`);
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              id={collection.collection_id}
              className="form-checkbox"
              type="checkbox"
              onChange={handleClick}
              checked={isChecked}
            />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
        <div className="flex items-center relative">
          <button>
            <svg
              className={`w-4 h-4 flex-shrink-0 fill-current text-gray-300`}
              viewBox="0 0 16 16"
            >
              <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
            </svg>
          </button>
        </div>
      </td>
      <td
        className="cursor-pointerpx-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 flex-shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded"
              src={proxyURL(collection.image_url ?? "", 50, 50)}
              alt={collection.title}
            />
          </div>
          <div className="flex font-medium text-gray-800">
            <p className='hover:underline ' onClick={() => navigate(`/shop/collections/${collection.collection_id}`)}>
              {collection.title}
            </p>
            {!!shop && <span className='ml-2'>
              <IoIosCopy className="text-gray-500 w-5 h-5 cursor-pointer" onClick={handleCopy} />
            </span>}
          </div>
        </div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="text-left">Manual</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="text-left">{collection.all_products_count}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="text-left">{collection.sales_channels ?? "All"}</div>
      </td>
    </tr>
  );
}

export default CollectionItemTable;
