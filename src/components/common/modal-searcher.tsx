import React, { useRef, useEffect, useState } from 'react';
import Transition from 'utils/transition';
import { useQuery } from 'react-query';
import { useDebounce } from 'hooks/use-debounce';
import { proxyURL } from 'utils/urlsigner';
import ModalBasic from 'components/ModalBasic';
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
      fetch(queryURL, {
        method: 'POST',
        body: JSON.stringify({ ...composeQuery(debouncedValue) }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .catch(e => {}),
    {
      enabled: queryEnabled && Boolean(debouncedValue),
    },
  );

  // const modalContent = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(data ? data.result : []);
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    e.stopPropagation();
    const { id, checked } = e.target;
    setSelectAll(false);
    if (checked) {
      setIsCheck([
        ...isCheck,
        data?.result.find(result => result[matchKey] === id),
      ]);
    }

    if (!checked) {
      setIsCheck(isCheck.filter((item: any) => item[matchKey] !== id));
    }
  };

  useEffect(() => {
    modalOpen && searchInput.current && searchInput.current.focus();
  }, [modalOpen]);

  return (
    <div>
      {/* Modal dialog */}
      <ModalBasic
        id={id}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title={`Add ${placeholder}`}
      >
        <div className="bg-white overflow-auto mx-auto px-5 w-full max-h-full rounded shadow-lg">
          {/* Search form */}
          <div className="border-b border-gray-200 z-50">
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">
                Search
              </label>
              <input
                id={searchId}
                className="w-full border-0 focus:ring-transparent placeholder-gray-400 appearance-none py-3 pl-10 pr-4"
                type="search"
                autoComplete="off"
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
          </div>
          {data && (
            <div className="py-4 px-2">
              {/* Recent searches */}
              <div className="mb-3 last:mb-0">
                <div className="flex justify-between">
                  <div className="text-xs font-semibold text-gray-400 uppercase mb-2">
                    Results
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleResultSelected(isCheck);
                    }}
                    className="btn-xs bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    Done
                  </button>
                </div>
                <div className="flex ml-2 items-center">
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
                        <div
                          className="flex items-center p-2 text-gray-800 rounded group"
                          // onClick={() => setModalOpen(!modalOpen)}
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
                          <div className="w-18 h-18 flex-shrink-0 mr-2 sm:mr-3">
                            <img
                              className=""
                              src={
                                it.image_url
                                  ? proxyURL(it.image_url, 50, 50)
                                  : 'https://via.placeholder.com/50'
                              }
                              alt={it.label}
                            />
                          </div>
                          <span>{it.label}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </ModalBasic>
    </div>
  );
}

export default SelectableResultSearchModal;
