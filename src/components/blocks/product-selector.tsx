import React, { useRef, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useDebounce } from "hooks/use-debounce"
import { proxyURL } from "utils/urlsigner"
import ModalBasic from "components/modal-basic"
import { fortressURL } from "endpoints/urls"
import { request } from "utils/request"
import { ProductViewType } from "typings/product/product-type"
const initiallySelected: string[] = []
function ProductSelector({
  id,
  searchId,
  queryKey,
  onChange,
  value = initiallySelected,
  queryEnabled = false,
  shopId,
}) {
  const matchKey = "key"
  const optionSearchURL = `${fortressURL}/shops/${shopId}/products/option-search`
  const filterURL = `${fortressURL}/shops/${shopId}/product-views/filter`

  const querybody = (term: string): Record<string, any> => {
    return { limit: 15, term, shop_id: shopId, type: "product" }
  }

  const [open, setOpen] = useState(false)
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [isCheck, setIsCheck] = useState<string[]>(value)

  const [searchTerm, setSearchTerm] = useState<string>("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const [products, setProducts] = useState<ProductViewType[]>([])
  const { data } = useQuery(
    [queryKey, debouncedSearchTerm],
    () =>
      fetch(optionSearchURL, {
        method: "POST",
        body: JSON.stringify({ ...querybody(debouncedSearchTerm) }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .catch((e) => {}),
    {
      enabled: queryEnabled && Boolean(debouncedSearchTerm),
    }
  )
  const searchInput = useRef<HTMLInputElement>(null)

  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    let checks: string[] = []
    if (data && data.result) {
      // TODO: make any typed
      checks = data.result.map((d: any) => d[matchKey])
    }
    setIsCheck(checks)
    if (selectAll) {
      setIsCheck([])
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    const { id, checked } = e.target
    setSelectAll(false)
    if (checked) {
      setIsCheck([...isCheck, id])
    }

    if (!checked) {
      setIsCheck(isCheck.filter((key) => key !== id))
    }
  }
  const handleRemove = (id: string) => {
    setIsCheck(isCheck.filter((key) => key !== id))
    onChange(isCheck)
  }

  useEffect(() => {
    open && searchInput.current && searchInput.current.focus()
  }, [open])

  useEffect(() => {
    try {
      if (isCheck.length > 0 || value.length > 0) {
        const response = request(filterURL, {
          method: "POST",
          body: JSON.stringify({
            shop_id: shopId,
            id_list: isCheck.length > 0 ? isCheck : value,
          }),
        })
        response.then((value) => setProducts(value?.products ?? []))
      } else {
        setProducts([])
      }
    } catch (error) {}
  }, [isCheck, value])

  return (
    <div>
      <div className="w-full">
        <div
          onClick={(e) => {
            e.stopPropagation()
            setOpen(!open)
          }}
          className="flex border-1 rounded"
        >
          <input
            type="text"
            className="form-input w-full"
            placeholder="Search products..."
          />
          <button className="flex items-center justify-center px-4 border-l">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
        <ModalBasic
          id={id}
          modalOpen={open}
          setModalOpen={setOpen}
          title={`Add products`}
        >
          <div className="shop?.shop_idbg-white overflow-auto mx-auto px-5 w-full max-h-full rounded shadow-lg">
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  placeholder={`Search products...`}
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
                      onClick={(e) => {
                        e.stopPropagation()
                        onChange(isCheck)
                        setOpen(!open)
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
                          !value.includes(x[matchKey])
                      )
                      .map((it) => (
                        <li key={it[matchKey]}>
                          <div className="flex items-center p-2 text-gray-800 rounded group">
                            <label className="inline-flex flex-shrink-0 mr-3">
                              <span className="sr-only">Select</span>
                              <input
                                id={it[matchKey]}
                                className="form-checkbox"
                                type="checkbox"
                                onChange={handleClick}
                                checked={isCheck.some(
                                  (item: string) => item === it[matchKey]
                                )}
                              />
                            </label>
                            <div className="w-18 h-18 flex-shrink-0 mr-2 sm:mr-3">
                              <img
                                className=""
                                src={
                                  it.image_url
                                    ? proxyURL(it.image_url, 50, 50)
                                    : "https://via.placeholder.com/50"
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
      <ul className="text-sm w-full">
        {products &&
          products.map((product: any) => (
            <li key={product.product_id} className="flex items-center">
              <div className="flex w-full items-center py-2 text-gray-500 rounded group">
                <div className="w-18 h-18 flex-shrink-0 mr-2 sm:mr-3">
                  <img
                    src={
                      product.image_url
                        ? proxyURL(product.image_url, 50, 50)
                        : "https://via.placeholder.com/50"
                    }
                    alt={product.handle}
                  />
                </div>
                <div className="w-full flex-grow flex justify-between">
                  <div className="text-sm font-medium text-gray-900">
                    {product.title}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemove(product.product_id)
                      onChange(isCheck)
                    }}
                    className="text-sm text-gray-500 cursor-pointer"
                  >
                    X
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ProductSelector
