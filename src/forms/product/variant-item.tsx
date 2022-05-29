import { mToS } from "utils/money"
import React, { useState, useEffect } from "react"

function ProductVariant(props) {
  const [price, setPrice] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  useEffect(() => {
    setPrice(mToS(props.price))
    setQuantity(props.quantity)
  }, [props.price, props.quantity])
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              id={props.id}
              className="form-checkbox"
              type="checkbox"
              onChange={props.handleClick}
              checked={props.isChecked}
            />
          </label>
        </div>
      </td>

      <td className="px-2 w-3/5 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center align-middle justify-start">
          <div className="hidden md:flex w-10 h-10 flex-shrink-0 sm:mr-3">
            <img
              className="rounded"
              src={props.image || "https://via.placeholder.com/150"}
              width="40"
              height="40"
              alt={props.name}
            />
          </div>
          <div className="flex ml-1 text-sm text-gray-900 hover:underline">
            <p>
              <a href="/">{props.name}</a>
            </p>
          </div>
        </div>
      </td>
      <td className="px-1 w-1/5 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="number"
          step={1}
          min={0}
          onBlur={(e) => props.updateQuantity(props.index, quantity)}
          onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
          className="form-input w-full rounded-sm"
          value={quantity}
        ></input>
      </td>
      <td className="px-1 w-1/5 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          className="form-input w-full rounded-sm"
          type="text"
          onBlur={(e) => props.updatePrice(props.index, price)}
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        ></input>
      </td>
    </tr>
  )
}

export default ProductVariant
