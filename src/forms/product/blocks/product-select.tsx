import isEmpty from "lodash/isEmpty"
import React, { useEffect, useState } from "react"
import { MultiValue, SingleValue } from "react-select"
import ReactSelect, { AsyncProps } from "react-select/async"
import { filterProductsAsOptions, productOptions } from "services"

type ProductSelectProps = {
  multi: boolean
  shop_id: string
  onChange: (value: string | string[]) => void
  value: string | string[]
}

export interface SelectOption {
  key: string
  label: string
}

const ProductSelect: React.FC<ProductSelectProps> = ({
  multi,
  onChange,
  value,
  shop_id,
}) => {
  const [singleValue, setSingleValue] = useState<SingleValue<SelectOption>>()
  const [multiValue, setMultiValue] = useState<MultiValue<SelectOption>>()

  const multiOnChange = (option: MultiValue<SelectOption>) => {
    setMultiValue(option)
    onChange(option.map((opt) => opt.key))
  }
  const singleOnChange = (option: SingleValue<SelectOption>) => {
    setSingleValue(option)
    if (option) {
      onChange(option?.key)
    }
  }

  useEffect(() => {
    if (value && !isEmpty(value) && shop_id) {
      const options = filterProductsAsOptions(
        shop_id,
        Array.isArray(value) ? value : [value]
      )
      options.then((result) => {
        if (multi) {
          setMultiValue(result)
        } else {
          setSingleValue(result && result.length > 0 ? result[0] : undefined)
        }
      })
    }
  }, [])

  return (
    <>
      {!multi && (
        <ReactSelect
          value={singleValue}
          cacheOptions
          closeMenuOnSelect={false}
          onChange={(option) => singleOnChange(option)}
          placeholder="Select products"
          loadOptions={productOptions(shop_id)}
          className="w-full"
        />
      )}
      {multi && (
        <ReactSelect
          value={multiValue}
          isMulti
          cacheOptions
          closeMenuOnSelect={false}
          onChange={(option) => multiOnChange(option)}
          placeholder="Select products"
          loadOptions={productOptions(shop_id)}
          className="w-full"
        />
      )}
    </>
  )
}

export default ProductSelect
