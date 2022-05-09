/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import { useNavigate, useParams } from 'react-router-dom';
import VoucherForm from 'forms/voucher/voucher';

function VoucherMutation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [currentlyBeingEditedVoucherId, setCurrentlyBeingEditedVoucherId] =
    useState<string | undefined>(id !== 'new' ? id : undefined);

  const handleSelectedItems = (selectedItems: any) => {
    setSelectedItems([...selectedItems]);
  };

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
          location="Vouchers"
        />
        <>
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-start sm:items-center mb-8">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <div className="m-1.5">
                    <button
                      onClick={() => navigate(-1)}
                      className="btn border border-transparent focus:outline-none rounded shadow bg-white appearance-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <VoucherForm
                id={currentlyBeingEditedVoucherId}
                codeType="single"
              />
            </div>
          </main>
        </>
      </div>
    </div>
  );
}

export default VoucherMutation;
