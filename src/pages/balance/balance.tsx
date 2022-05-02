import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import Transition from '../../utils/transition';

import { paymentURL } from 'endpoints/urls';

import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import FilterButton from 'components/dropdown-filter';
import BottomNav from 'components/bottom-navigation';
import { useAtom } from 'jotai';
import { request, ResponseError } from 'utils/request';
import { uidAtom } from 'store/authorization-atom';
import DateSelect from 'components/date-select';
import { currencyToM, mToSFormatted, sToCurrency, sToM } from 'utils/money';
import Button from 'components/blocks/button';
import { TransferKind, TransferType } from 'typings/payment/transfer';
import { toast } from 'react-toastify';
import Input from 'components/blocks/input';
import useShop from 'hooks/use-shop';
import usePayment from 'hooks/use-payment';
import { ThemeProvider } from 'styles/material/theme';

function Balance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { shop } = useShop();
  const shopId = shop?.shop_id;
  const { shopAccount: paymentAccount } = usePayment();
  const [usraId] = useAtom(uidAtom);
  const requestURL = `${paymentURL}/${shopId}/accounts/${paymentAccount?.account_id}`;
  const withdrawalURL = `${paymentURL}/${shopId}/accounts/${paymentAccount?.account_id}/withdraw`;

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState<number>(15);
  const [amountToWithdraw, setAmountToWithdraw] = useState<string>('0.0');

  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const align = 'right';

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !open ||
        dropdown.current.contains(target) ||
        trigger?.current?.contains(target)
      )
        return;
      setOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!open || keyCode !== 27) return;
      setOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const query = `SELECT * FROM transaction WHERE account_id = '${usraId}' ORDER BY created_at DESC LIMIT ${
    (page - 1) * itemsPerPage + 1
  }, ${itemsPerPage}`;

  const { data } = useQuery<any, ResponseError>(
    ['account-activities', page],
    async () => {
      try {
        const resp = await request(`${requestURL}/transactions`, {
          method: 'POST',
          body: JSON.stringify({ query }),
          headers: { 'Content-Type': 'application/json' },
        });
        return resp;
      } catch (error) {}
    },

    {
      keepPreviousData: true,
      enabled: !!usraId && !!paymentAccount?.account_id,
      refetchOnWindowFocus: false,
      staleTime: 2000,
    },
  );

  const { mutate: makeWithdrawal } = useMutation(
    (payload: TransferType) =>
      request(withdrawalURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (transfer: TransferType) => {
        // setCollectionId(newCollection.collection_id);
        // queryClient.setQueryData(['collection', collectionId], newCollection);
        toast('Amount succefully sent');
      },
      onError: (e: ResponseError) => {
        toast('Could not process withdraw at this time due to ' + e.message);
      },
    },
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          location="Balance"
        />

        <main className="mb-10 md:mb-0">
          <section className="px-2 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="px-4 mx-auto">
              <div className="flex flex-wrap -m-4">
                <div className="w-full lg:w-1/2 p-4">
                  <div className="p-6 shadow flex flex-col col-span-full bg-white rounded-lg border border-slate-200">
                    <div className="flex mb-1 items-center justify-between">
                      <h3 className="text-gray-500">Balance</h3>
                      <button>
                        <svg
                          className="h-4 w-4 text-gray-200"
                          viewBox="0 0 16 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 0.333344C7.67037 0.333344 7.34813 0.431092 7.07405 0.614228C6.79997 0.797363 6.58635 1.05766 6.4602 1.36221C6.33406 1.66675 6.30105 2.00186 6.36536 2.32516C6.42967 2.64846 6.5884 2.94543 6.82149 3.17852C7.05458 3.41161 7.35155 3.57034 7.67485 3.63465C7.99815 3.69896 8.33326 3.66596 8.63781 3.53981C8.94235 3.41366 9.20265 3.20004 9.38578 2.92596C9.56892 2.65188 9.66667 2.32965 9.66667 2.00001C9.66667 1.55798 9.49107 1.13406 9.17851 0.821499C8.86595 0.508939 8.44203 0.333344 8 0.333344ZM2.16667 0.333344C1.83703 0.333344 1.5148 0.431092 1.24072 0.614228C0.966635 0.797363 0.753014 1.05766 0.626868 1.36221C0.500722 1.66675 0.467717 2.00186 0.532025 2.32516C0.596334 2.64846 0.755068 2.94543 0.988156 3.17852C1.22124 3.41161 1.51822 3.57034 1.84152 3.63465C2.16482 3.69896 2.49993 3.66596 2.80447 3.53981C3.10902 3.41366 3.36931 3.20004 3.55245 2.92596C3.73559 2.65188 3.83333 2.32965 3.83333 2.00001C3.83333 1.55798 3.65774 1.13406 3.34518 0.821499C3.03262 0.508939 2.6087 0.333344 2.16667 0.333344ZM13.8333 0.333344C13.5037 0.333344 13.1815 0.431092 12.9074 0.614228C12.6333 0.797363 12.4197 1.05766 12.2935 1.36221C12.1674 1.66675 12.1344 2.00186 12.1987 2.32516C12.263 2.64846 12.4217 2.94543 12.6548 3.17852C12.8879 3.41161 13.1849 3.57034 13.5082 3.63465C13.8315 3.69896 14.1666 3.66596 14.4711 3.53981C14.7757 3.41366 15.036 3.20004 15.2191 2.92596C15.4023 2.65188 15.5 2.32965 15.5 2.00001C15.5 1.55798 15.3244 1.13406 15.0118 0.821499C14.6993 0.508939 14.2754 0.333344 13.8333 0.333344Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center mb-3">
                      <p className="text-4xl font-bold">
                        {mToSFormatted(paymentAccount?.balance)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 p-4">
                  <div className="p-6 shadow  flex flex-col col-span-full bg-white rounded-lg border border-slate-200">
                    <div className="flex mb-1 items-center justify-between">
                      <h3 className="text-gray-500">Pending</h3>
                      <button>
                        <svg
                          className="h-4 w-4 text-gray-200"
                          viewBox="0 0 16 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 0.333344C7.67037 0.333344 7.34813 0.431092 7.07405 0.614228C6.79997 0.797363 6.58635 1.05766 6.4602 1.36221C6.33406 1.66675 6.30105 2.00186 6.36536 2.32516C6.42967 2.64846 6.5884 2.94543 6.82149 3.17852C7.05458 3.41161 7.35155 3.57034 7.67485 3.63465C7.99815 3.69896 8.33326 3.66596 8.63781 3.53981C8.94235 3.41366 9.20265 3.20004 9.38578 2.92596C9.56892 2.65188 9.66667 2.32965 9.66667 2.00001C9.66667 1.55798 9.49107 1.13406 9.17851 0.821499C8.86595 0.508939 8.44203 0.333344 8 0.333344ZM2.16667 0.333344C1.83703 0.333344 1.5148 0.431092 1.24072 0.614228C0.966635 0.797363 0.753014 1.05766 0.626868 1.36221C0.500722 1.66675 0.467717 2.00186 0.532025 2.32516C0.596334 2.64846 0.755068 2.94543 0.988156 3.17852C1.22124 3.41161 1.51822 3.57034 1.84152 3.63465C2.16482 3.69896 2.49993 3.66596 2.80447 3.53981C3.10902 3.41366 3.36931 3.20004 3.55245 2.92596C3.73559 2.65188 3.83333 2.32965 3.83333 2.00001C3.83333 1.55798 3.65774 1.13406 3.34518 0.821499C3.03262 0.508939 2.6087 0.333344 2.16667 0.333344ZM13.8333 0.333344C13.5037 0.333344 13.1815 0.431092 12.9074 0.614228C12.6333 0.797363 12.4197 1.05766 12.2935 1.36221C12.1674 1.66675 12.1344 2.00186 12.1987 2.32516C12.263 2.64846 12.4217 2.94543 12.6548 3.17852C12.8879 3.41161 13.1849 3.57034 13.5082 3.63465C13.8315 3.69896 14.1666 3.66596 14.4711 3.53981C14.7757 3.41366 15.036 3.20004 15.2191 2.92596C15.4023 2.65188 15.5 2.32965 15.5 2.00001C15.5 1.55798 15.3244 1.13406 15.0118 0.821499C14.6993 0.508939 14.2754 0.333344 13.8333 0.333344Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center mb-3">
                      <p className="text-4xl font-bold">
                        {mToSFormatted(paymentAccount?.blocked_amount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* More actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left side */}

              {/* Right side */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Dropdown */}
                <DateSelect />
                {/* Filter button */}
                <FilterButton align="right" />
                <div className="relative inline-flex">
                  <Button
                    ref={trigger}
                    onClick={() => setOpen(true)}
                    size="small"
                    aria-haspopup="true"
                    aria-expanded={open}
                  >
                    Withdraw
                  </Button>
                  <Transition
                    show={open}
                    tag="div"
                    className={`origin-top-right z-10 absolute top-full min-w-56 bg-white border border-gray-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${
                      align === 'right' ? 'right-0' : 'left-0'
                    }`}
                    enter="transition ease-out duration-200 transform"
                    enterStart="opacity-0 -translate-y-2"
                    enterEnd="opacity-100 translate-y-0"
                    leave="transition ease-out duration-200"
                    leaveStart="opacity-100"
                    leaveEnd="opacity-0"
                    appear={open}
                  >
                    <div ref={dropdown}>
                      <div className="align-middle">
                        <div className="flex justify-between content-center py-3 space-x-6 px-8">
                          <Input
                            label={'Amount'}
                            type="text"
                            className="self-center block"
                            onChange={e => setAmountToWithdraw(e.target.value)}
                            value={amountToWithdraw}
                            onBlur={event =>
                              setAmountToWithdraw(
                                sToCurrency(
                                  event.currentTarget.value,
                                ).toString(),
                              )
                            }
                            name={'amount'}
                          />
                        </div>
                      </div>
                      <div className="py-2 px-3 border-t border-gray-200 bg-gray-50">
                        <ul className="flex items-center justify-between">
                          <li>
                            <button
                              onClick={() => setOpen(false)}
                              className="btn-xs bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
                            >
                              Cancel
                            </button>
                          </li>
                          <li>
                            <button
                              className="btn-xs bg-purple-500 hover:bg-purple-600 text-white"
                              onClick={() => {
                                const trsf: TransferType = {
                                  transfer_kind: TransferKind.TRANSFER,
                                  source_id: paymentAccount?.account_id,
                                  loopy: false,
                                  authorisor_id: usraId,
                                  unit_amount:
                                    sToCurrency(amountToWithdraw).intValue,
                                  is_system: false,
                                  amount: currencyToM(
                                    sToCurrency(amountToWithdraw),
                                    shop?.currency?.iso_code,
                                  ),
                                  description: 'payout',
                                };
                                makeWithdrawal(trsf);
                                setOpen(false);
                              }}
                              onBlur={() => setOpen(false)}
                            >
                              Withdraw
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>

            <div>
              <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="p-3">
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      {/* Table header */}
                      <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-lg">
                        <tr>
                          <th className="p-2">
                            <div className="font-semibold text-left">Date</div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-left">
                              Description
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-right">
                              Amount
                            </div>
                          </th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-xs sm:text-sm font-medium divide-y divide-gray-100">
                        {/* Row */}
                        <tr>
                          <td className="p-2 w-1/6">
                            <div className="text-left text-gray-500">
                              Yesterday
                            </div>
                          </td>
                          <td className="p-2 w-3/6">
                            <div className="flex items-center">
                              <div className="text-gray-500">For order</div>
                            </div>
                          </td>
                          <td className="p-2 w-2/6">
                            <div className="text-right text-gray-500">
                              $3,877
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            {data && (
              <ThemeProvider>
                <Pagination
                  count={data?.total / itemsPerPage}
                  variant="outlined"
                  color="primary"
                  className="mt-4 md:mt-8"
                  page={page}
                  onChange={(event: ChangeEvent<unknown>, page: number) =>
                    setPage(page)
                  }
                />
              </ThemeProvider>
            )}
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}

export default Balance;
