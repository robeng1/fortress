import useClipboard from 'hooks/use-clipboard';
import useShop from 'hooks/use-shop';
import React from 'react';
import { IoIosCopy } from 'react-icons/io';
import { CollectionViewType } from 'typings/collection/collection-type';
import { proxyURL } from 'utils/urlsigner';
type CollectionCardProps = {
  collection: CollectionViewType
  handleShow: () => void
}
const CollectionCard: React.FC<CollectionCardProps> = ({ collection, handleShow }) => {
  const { shop } = useShop();
  const [isCopied, handleCopy] = useClipboard(`https://${shop?.permanent_domain}/collections/${collection.handle}`);
  return (
    <>
      <div
        className="flex-shrink-0 w-[60px] h-[60px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden"
      >
        <img
          onClick={handleShow}
          src={proxyURL(collection.image_url ?? "", 50, 50)}
          alt={collection.title}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-2 flex-1 flex flex-col pl-2">
        <div>
          <div className="flex justify-between text-sm font-medium text-gray-900">
            <div className='flex'>
              <p>
                {collection.title}
              </p>
              {!!shop && <span className='ml-2'>
                <IoIosCopy className="text-gray-500 w-5 h-5 cursor-pointer" onClick={handleCopy} />
              </span>}
            </div>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p
              className={`text-sm text-gray-500 rounded-full text-center py-0.5`}
            >
              Manual
            </p>
          </div>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded-full text-center py-0.5`}
          >
            {collection.all_products_count} {(collection.all_products_count ?? 0) > 1 ? "items" : 'item'}
          </p>
        </div>
      </div>
    </>
  );
}

export default CollectionCard;
