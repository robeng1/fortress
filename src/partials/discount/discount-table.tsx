import React from 'react';
import EmptyState from 'partials/empty-state';
import DiscountList from './mobile/discount-list';
import { useNavigate } from 'react-router-dom';
import { DiscountViewType } from 'typings/discount/discount-type';

type DiscountTableProps = {
  selectedItems: (items: string[]) => void
  discounts: DiscountViewType[]
}
const  DiscountTable: React.FC<DiscountTableProps> = ({ selectedItems, discounts }) =>{
  const navigate = useNavigate();
  return (
    <>
      {discounts.length > 0 ? (
        <div className="border border-transparent focus:outline-none rounded-md shadow-lg bg-white appearance-none relative">
          <DiscountList discounts={discounts} />
          <div className="md:flex flex-col hidden">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Usage
                        </th>
                        <th scope="col" className="relative px-6 py-2">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {discounts.map(discount => (
                        <tr key={discount.discount_id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {discount.image_url && (
                                  <img
                                    className="h-10 w-10 rounded"
                                    src={discount.image_url}
                                    alt={discount.name}
                                  />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {discount.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {discount.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {discount.type === 'Site' ? 'Automatic' : 'Manual'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {discount.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {discount.num_applications}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/discounts/${discount.discount_id}`)
                            }} className="text-purple-600 hover:text-purple-900">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          heading="No discounts yet"
          msg="Create some discounts to get started"
          action={{
            name: 'Create discount',
            func: () => navigate('/discounts/new'),
          }}
        />
      )}
    </>
  );
}

export default DiscountTable;
