import { useState } from 'react';
import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import BottomNav from 'components/BottomNav';
import { Link } from 'react-router-dom';
import useDomains from 'hooks/use-domains';
import useModal from 'hooks/use-modal';
import ModalBasic from 'components/ModalBasic';
import { useMutation, useQueryClient } from 'react-query';
import { DNSEntry } from 'models/domains/domains';
import useToaster from 'hooks/use-toaster';
import { request, ResponseError } from 'utils/request';
import { domainURL } from 'endpoints/urls';
import useShop from 'hooks/use-shop';

function Domains() {
  const qc = useQueryClient();
  const { shop } = useShop();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { entries } = useDomains();
  const [domain, setDomain] = useState<string>();

  const { isOpen, handleOpen, handleClose } = useModal(false);
  const addRequestURL = `${domainURL}/shops/${shop?.shop_id}/domains`;
  const updateRequestURL = `${domainURL}/shops/${shop?.shop_id}/domains/${domain}`;

  // create the domain
  const { mutate: addDomain, isLoading: isAddingDomain } = useMutation(
    (payload: DNSEntry) =>
      request(addRequestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newDomain: DNSEntry) => {
        qc.invalidateQueries(['domains']);
        // toast('Location created successfully');
      },
      onError: (e: ResponseError) => {
        // toast('Location creation failed due to ' + e.message);
      },
    },
  );
  // update the domain
  const { mutate: updateDomain, isLoading: isUpdatingDomain } = useMutation(
    (payload: DNSEntry) =>
      request(updateRequestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newDomain: DNSEntry) => {
        qc.invalidateQueries(['domains']);
        // toast('Location created successfully');
      },
      onError: (e: ResponseError) => {
        // toast('Location creation failed due to ' + e.message);
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
          location="Domains"
        />
        <div className="px-6 py-8 bg-slate-50 border border-slate-200 rounded-sm">
          <div className="text-start">
            <ul className="inline-flex flex-wrap text-sm font-medium">
              <li className="flex items-center">
                <Link
                  to="/settings"
                  className="text-blue-500 hover:text-indigo-500"
                >
                  Settings
                </Link>
                <svg
                  className="h-4 w-4 fill-current text-slate-400 mx-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                </svg>
              </li>
              <li className="flex items-center">
                <Link
                  to="/settings/domains"
                  className="text-slate-500 hover:text-indigo-500"
                >
                  Domains
                </Link>
              </li>
            </ul>
            {/* End */}
          </div>
        </div>
        <div className="md:p-6 p-4 space-y-6">
          <div className="flex justify-end">
            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              aria-controls="feedback-modal"
              onClick={e => {
                e.stopPropagation();
                handleOpen();
              }}
            >
              Add Domain
            </button>
          </div>
        </div>
        <div className="m-1.5">
          <ModalBasic
            id="domain-modal"
            modalOpen={isOpen}
            setModalOpen={state =>
              state === true ? handleOpen() : handleClose()
            }
            title="Add domain"
          >
            <div className="px-5 py-4">
              <div className="text-sm">
                <div className="font-medium text-slate-800 mb-3">
                  CNAME : shops.myreoplex.com
                </div>
                <div className="font-medium text-slate-800 mb-3">
                  A : 31.245.6.78
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="domain"
                  >
                    Domain <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="domain"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-slate-200">
              <div className="flex flex-wrap justify-end space-x-2">
                <button
                  className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                  onClick={e => {
                    e.stopPropagation();
                    handleClose();
                  }}
                >
                  Cancel
                </button>
                <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
                  Add
                </button>
              </div>
            </div>
          </ModalBasic>
        </div>

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div>
              <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="p-3">
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="table-auto w-50 md:w-full">
                      {/* Table header */}
                      <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-lg">
                        <tr>
                          <th className="p-2">
                            <div className="font-semibold text-left">Name</div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-left">
                              Status
                            </div>
                          </th>

                          <th className="p-2">
                            <div className="font-semibold text-left">
                              Provider
                            </div>
                          </th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-xs sm:text-sm font-medium divide-y divide-gray-100">
                        {entries?.map(entry => (
                          <tr key={entry.domain || entry.id}>
                            <td className="p-2 w-1/6">
                              <div className="text-left text-gray-800">
                                {entry?.domain}
                              </div>
                            </td>
                            <td className="p-2 w-3/6">
                              <div className="text-left text-gray-800">
                                {entry.is_active
                                  ? 'Connected'
                                  : 'Not connected'}
                              </div>
                            </td>

                            <td className="p-2 w-2/6">
                              <div className="text-left text-gray-800">
                                {entry?.is_system ? 'Reoplex' : 'Unknown'}
                              </div>
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
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

export default Domains;
