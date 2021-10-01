import * as React from 'react';

export default function Order({ handleShow }) {
  return (
    <>
      <main className="flex-1 pt-12 px-2 md:px-4 w-full h-full overflow-auto bg-gray-100 mb-3">
        <header className="flex">
          <button
            onClick={() => handleShow(false, '')}
            className="inline-flex text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="fill-current h-6 text-gray-600"
            >
              <path d="M12 16c-.256 0-.512-.098-.707-.293l-5-5c-.39-.39-.39-1.023 0-1.414l5-5c.39-.39 1.023-.39 1.414 0s.39 1.023 0 1.414L8.414 10l4.293 4.293c.39.39.39 1.023 0 1.414-.195.195-.45.293-.707.293z"></path>
            </svg>
            <span>Orders</span>
          </button>

          <button className="flex-none hover:bg-gray-300 ml-auto px-1 py-1 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="back"
              className="fill-current h-5 text-gray-600"
            >
              <path d="M22.4 10.2H7.1c-.5 0-.6-.6-.4-.8l4.5-4.5c.2-.2.2-.7 0-.9l-1-1c-.3-.3-.7-.3-1 0l-8.1 8c-.3.3-.3.7 0 1l8.1 8.1c.3.3.7.3 1 0l.9-1c.3-.3.3-.7 0-1l-4.4-4.4c-.3-.3-.1-.8.3-.8h15.3c.4 0 .7-.3.7-.7v-1.4c.1-.3-.2-.6-.6-.6z"></path>
            </svg>
          </button>
          <button className="flex-none hover:bg-gray-300 ml-2 px-1 py-1 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="forward"
              className="fill-current h-5 text-gray-600"
            >
              <path d="M1.6 13.4h15.3c.4 0 .6.5.3.8l-4.4 4.4c-.3.3-.3.7 0 1l1 1c.3.3.7.3 1 0l8-8.1c.3-.3.3-.7 0-1l-8-8.1c-.3-.3-.7-.3-1 0l-1 1c-.2.3-.2.7 0 1l4.5 4.4c.2.3.1.8-.4.8H1.6c-.4 0-.7.3-.7.7v1.3c0 .4.3.8.7.8z"></path>
            </svg>
          </button>
        </header>
        <div className="mt-2 flex flex-initial items-baseline">
          <div className="flex md:flex-row flex-col flex-initial items-baseline align-middle shadow justify-start rounded-lg px-3 py-3">
            <h1 className="font-semibold text-2xl">#1032</h1>
            <p className="pl-3 text-gray-700">
              May 25, 2018 at 2:30pm from Draft Orders
            </p>
            {/* <span className="bg-gray-300 border-2 border-white inline-flex items-center leading-none ml-3 px-2 py-1 rounded-full text-gray-700 text-sm">
              Paid
            </span>
            <span className="bg-yellow-300 border-2 border-white inline-flex items-center leading-none ml-2 px-2 py-1 rounded-full text-black text-sm">
              Unfilled
            </span> */}
          </div>
        </div>
        {/* <div className="flex mt-2">
          <button className="focus:bg-gray-300 focus:outline-none hover:text-gray-800 inline-flex leading-snug px-2 py-2 rounded text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="print"
              className="fill-current h-5 text-gray-600"
            >
              <path d="M21.5 8h-19c-1 0-1.8.9-1.8 1.9v6.4c0 1.1.8 1.9 1.8 1.9h2.8v2.7c0 1 .8 1.8 1.8 1.8h9.8c1.1 0 1.9-.8 1.9-1.8v-2.7h2.7c1 0 1.9-.8 1.9-1.9V9.9c-.1-1-.9-1.9-1.9-1.9zM3.8 12.8c-.8 0-1.4-.6-1.4-1.4S3 10 3.8 10s1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm12.8 7.1c0 .4-.4.7-.7.7H8c-.3 0-.7-.3-.7-.7v-4.5c0-.4.4-.7.7-.7h7.9c.3 0 .7.3.7.7v4.5zm2.1-14.8c0 .4-.3.7-.7.7H5.9c-.4 0-.7-.3-.7-.7V2c0-.4.3-.7.7-.7H18c.4 0 .7.3.7.7v3.1z"></path>
            </svg>
            <span className="pl-2 text-sm">Print Order</span>
          </button>
          <button className="focus:bg-gray-300 focus:outline-none hover:text-gray-800 inline-flex leading-snug ml-4 px-2 py-2 rounded text-gray-600">
            <span className="pr-1 text-sm">More actions</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="fill-current h-5 text-gray-600"
            >
              <path d="M6.28 9.28l3.366 3.366c.196.196.512.196.708 0L13.72 9.28c.293-.293.293-.767 0-1.06-.14-.14-.332-.22-.53-.22H6.81c-.414 0-.75.336-.75.75 0 .2.08.39.22.53z"></path>
            </svg>
          </button>
        </div> */}

        <section className="flex flex-col md:flex-row mt-6 mb-20">
          <div className="flex-1 mb-6 md:mr-4">
            <div className="bg-white border mb-6 rounded shadow">
              <header className="flex items-center pb-3 pl-6 pr-3 pt-5">
                <span className="font-semibold inline-flex items-center text-gray-700">
                  <i className="border-2 border-dashed border-yellow-700 h-5 inline-block mr-3 rounded-full w-5 shadow-yellow-large"></i>
                  <span>Unfulfilled</span>
                </span>

                <button className="hidden md:inline-flex focus:bg-gray-300 focus:outline-none hover:text-gray-800 leading-snug ml-auto px-2 py-2 rounded text-gray-600">
                  <span>375 Vanderbilt Avenue</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="fill-current h-5 text-gray-600"
                  >
                    <path d="M6.28 9.28l3.366 3.366c.196.196.512.196.708 0L13.72 9.28c.293-.293.293-.767 0-1.06-.14-.14-.332-.22-.53-.22H6.81c-.414 0-.75.336-.75.75 0 .2.08.39.22.53z"></path>
                  </svg>
                </button>
              </header>

              <div className="border-b flex mx-5 py-2">
                <div className="flex-shrink-0 w-[60px] md:w-[48px]  align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden">
                  <img
                    src="https://about.canva.com/wp-content/uploads/sites/3/2015/01/music_poster.png"
                    alt=""
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="flex md:flex-row flex-col justify-between w-full">
                  <div className="pl-2">
                    <p className="text-blue-600 text-sm overflow-ellipsis">
                      Daft Punk - Random Access
                    </p>
                    <span className="block md:mt-px text-gray-600 text-sm">
                      SKU: 90991822
                    </span>
                  </div>
                  <div className="flex gap-x-5 md:gap-28 md:self-center self-start pl-2">
                    <div className="font-medium text-green-900 text-sm">
                      $70.00 x 1
                    </div>
                    <div className="font-medium text-green-900 text-sm">
                      $70.00
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b flex mx-5 py-2">
                <div className="flex-shrink-0 w-[60px] md:w-[48px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden">
                  <img
                    src="https://about.canva.com/wp-content/uploads/sites/3/2015/01/volleyball_poster.png"
                    alt=""
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="flex md:flex-row flex-col justify-between w-full">
                  <div className="pl-2">
                    <p className="text-blue-600 text-sm overflow-ellipsis">
                      Daft Punk - Random Access
                    </p>
                    <span className="block md:mt-px text-gray-600 text-sm">
                      SKU: 90991822
                    </span>
                  </div>
                  <div className="flex gap-5 md:gap-28 md:self-center self-start pl-2">
                    <div className="font-medium text-green-900 text-sm">
                      $70.00 x 1
                    </div>
                    <div className="font-medium text-green-900 text-sm">
                      $70.00
                    </div>
                  </div>
                </div>
              </div>

              <footer className="border-t flex md:flex-row flex-col justify-end px-5 py-4">
                <button
                  type="button"
                  class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-3 mb-3"
                >
                  Mark as processing
                </button>
                <button
                  type="button"
                  class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-3 mb-3"
                >
                  Mark as fulfilled
                </button>
                <button
                  type="button"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-3 mb-3"
                >
                  Cancel
                </button>
              </footer>
            </div>

            <div className="bg-white border rounded shadow">
              <span className="font-semibold inline-flex items-center ml-6 mt-5 text-gray-700">
                <span>Payment</span>
              </span>

              <div className="flex mt-4 mx-5 py-2 text-gray-700 text-sm">
                <span>Subtotal</span>
                <span className="ml-auto">$120.00</span>
              </div>

              <div className="flex mx-5 pb-2 text-gray-700 text-sm">
                <span className="w-1/6">Shipping</span>
                <span className="">Manual (0.0kg)</span>
                <span className="ml-auto">$9.50</span>
              </div>
              <div className="flex mx-5 pb-2 text-gray-700 text-sm">
                <span className="w-1/6">Tax</span>
                <span>HST 13%</span>
                <span className="ml-auto">$15.60</span>
              </div>
              <div className="border-b flex font-bold mx-5 pb-2 text-gray-700 text-sm">
                <span>Total</span>
                <span className="ml-auto">$145.10</span>
              </div>

              <div className="flex mx-5 pb-6 pt-3 text-gray-700 text-sm">
                <span>Paid by customer</span>
                <span className="ml-auto">$145.10</span>
              </div>
              <footer className="border-t flex justify-end px-5 py-4">
                <button
                  type="button"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3"
                >
                  Refund
                </button>
              </footer>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="bg-white border p-5 rounded shadow">
              <header className="flex justify-center">
                <span className="font-medium text-base">Notes</span>
                <button className="ml-auto text-blue-500 text-sm">Edit</button>
              </header>
              <p className="mt-4 text-gray-600 text-sm">
                No notes from customer
              </p>
            </div>

            <div className="bg-white border mt-4 rounded shadow">
              <header className="flex p-5">
                <span className="font-medium text-base">Customer</span>
                <span className="bg-blue-800 flex h-8 items-center justify-center ml-auto relative rounded-full shadow-lg w-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="user"
                    className="bottom-0 fill-current mt-3 text-white w-6"
                  >
                    <path d="M23.1 19.8v1.1c0 1.2-1 2.2-2.2 2.2H3.1c-1.2 0-2.2-1-2.2-2.2v-1.1c0-2.6 3.2-4.3 6.1-5.6l.3-.1c.2-.1.5-.1.7 0 1.2.8 2.5 1.2 4 1.2s2.8-.4 3.9-1.2c.3-.1.5-.1.7 0l.3.1c3 1.3 6.2 2.9 6.2 5.6zM12 .9c3 0 5.5 2.7 5.5 6.1S15 13.1 12 13.1 6.5 10.4 6.5 7 9 .9 12 .9z"></path>
                  </svg>
                </span>
              </header>
              <p className="mt-4 px-5 text-blue-500 text-sm">Paa Kwesi</p>
              <span className="block mb-5 px-5 text-gray-600 text-sm">
                1 order
              </span>

              <div className="border-t pt-4 px-5">
                <header className="flex items-center">
                  <span className="font-medium text-xs uppercase">
                    Contact Information
                  </span>
                  <button className="ml-auto text-blue-500">Edit</button>
                </header>
                <span className="block mb-5 mt-1 text-blue-500 text-sm">
                  romeo@reoplex.com
                </span>
                <span className="block mb-5 mt-1 text-blue-500 text-sm">
                  +233246493078
                </span>
              </div>

              <div className="border-t pt-4 px-5">
                <header className="flex items-center">
                  <span className="font-medium text-xs uppercase">
                    Shipping Address
                  </span>
                  <button className="ml-auto text-blue-500 text-sm">
                    Edit
                  </button>
                </header>

                <p className="py-4 text-gray-600 text-sm">
                  Paa Kwesi
                  <br />
                  150 Elgin Street <br />
                  Floor 8 <br />
                  Ottawa OW K2P LP4
                  <br />
                  Canada
                </p>

                <a href="/" className="block mb-5 text-blue-500 text-sm">
                  View map
                </a>
              </div>

              <div className="border-t pb-4 pt-4 px-5">
                <header className="flex">
                  <span className="font-medium text-xs uppercase">
                    Billing Address
                  </span>
                </header>
                <p className="mt-4 text-gray-600 text-sm">
                  Same as shipping address
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
