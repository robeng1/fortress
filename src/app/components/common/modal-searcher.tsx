import React, { useRef, useEffect, useState } from 'react';
import ky from 'ky';
import { Link } from 'react-router-dom';
import Transition from 'app/utils/transition';
import { useQuery } from 'react-query';
import { useDebounce } from 'app/hooks/use-debounce';
interface Result {
  result: any[];
}
const initiallySelected: any[] = [];
function SelectableResultSearchModal({
  id,
  searchId,
  modalOpen,
  setModalOpen,
  queryURL,
  composeQuery,
  matchKey,
  queryKey,
  handleResultSelected,
  alreadySelected = initiallySelected,
  placeholder = 'Anything',
  queryEnabled = false,
}) {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<any>([]);
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce(value, 500);
  const { data } = useQuery(
    [queryKey, debouncedValue],
    () =>
      ky
        .post(`${queryURL}`, {
          body: JSON.stringify({ query: composeQuery(debouncedValue) }),
        })
        .json<Result>(),
    {
      enabled: queryEnabled && Boolean(debouncedValue),
    },
  );

  const modalContent = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(data ? data.result : []);
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([
      ...isCheck,
      data?.result.find(result => result[matchKey] === id),
    ]);
    if (!checked) {
      setIsCheck(isCheck.filter((item: any) => item[matchKey] !== id));
    }
  };
  useEffect(() => {
    handleResultSelected(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !modalOpen ||
        (modalContent.current && modalContent.current.contains(target))
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    modalOpen && searchInput.current && searchInput.current.focus();
  }, [modalOpen]);

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        appear
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        appear
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
        >
          {/* Search form */}
          <form className="border-b border-gray-200 z-20">
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">
                Search
              </label>
              <input
                id={searchId}
                className="w-full border-0 focus:ring-transparent placeholder-gray-400 appearance-none py-3 pl-10 pr-4"
                type="search"
                onChange={e => setValue(e.target.value)}
                value={value}
                placeholder={`Search ${placeholder}...`}
                ref={searchInput}
              />
              <button
                className="absolute inset-0 right-auto group"
                type="submit"
                aria-label="Search"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-4 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </div>
          </form>
          {data && (
            <div className="py-4 px-2">
              {/* Recent searches */}
              <div className="mb-3 last:mb-0">
                <div className="text-xs font-semibold text-gray-400 uppercase px-2 mb-2">
                  Results
                </div>
                <div className="flex items-center">
                  <label className="inline-flex">
                    <span className="sr-only">Select all</span>
                    <input
                      className="form-checkbox"
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </label>
                </div>
                <ul className="text-sm">
                  {data?.result
                    .filter(
                      (x: Record<string, string>) =>
                        !alreadySelected.includes(x[matchKey]),
                    )
                    .map(it => (
                      <li key={it[matchKey]}>
                        <Link
                          className="flex items-center p-2 text-gray-800 hover:text-white hover:bg-purple-500 rounded group"
                          to="#0"
                          onClick={() => setModalOpen(!modalOpen)}
                        >
                          <label className="inline-flex flex-shrink-0 mr-3">
                            <span className="sr-only">Select</span>
                            <input
                              id={it[matchKey]}
                              className="form-checkbox"
                              type="checkbox"
                              onChange={handleClick}
                              checked={isCheck.some(
                                (item: any) => item[matchKey] === it[matchKey],
                              )}
                            />
                          </label>
                          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <img
                              className=""
                              src={it.image_url}
                              width="40"
                              height="40"
                              alt={it.label}
                            />
                          </div>
                          <span>{it.label}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Transition>
    </>
  );
}

export default SelectableResultSearchModal;
