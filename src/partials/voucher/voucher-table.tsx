import React from 'react';
import EmptyState from 'partials/empty-state';
import VoucherList from './mobile/voucher-list';
import { useNavigate } from 'react-router-dom';
import { VoucherType } from 'typings/voucher/voucher';


type VoucherTableProps = {
  selectedItems: (items: string[]) => void
  vouchers: VoucherType[]
}

const VoucherTable: React.FC<VoucherTableProps> = ({ selectedItems, vouchers }) => {
  const navigate = useNavigate();
  return (
    <>
      {vouchers.length > 0 ? (
        <div className="border border-transparent focus:outline-none rounded-md shadow-lg bg-white appearance-none relative">
          <VoucherList vouchers={vouchers} />
          <div className="md:flex flex-col hidden">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Code
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Usages
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {vouchers.map(voucher => (
                        <tr key={voucher.voucher_id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 cursor-pointer hover:underline">
                                  {voucher.name ?? voucher.code}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {voucher.code}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {voucher.code}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {voucher.num_cart_additions}
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
          heading="No vouchers yet"
          msg="Create some vouchers to get started"
          action={{
            name: 'Create voucher',
            func: () => navigate('/vouchers/new'),
          }}
        />
      )}
    </>
  );
}

export default VoucherTable;
