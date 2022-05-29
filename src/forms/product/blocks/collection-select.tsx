import isEmpty from "lodash/isEmpty"
import React, { useEffect, useState } from "react"
import { MultiValue, SingleValue } from "react-select"
import ReactSelect, { AsyncProps } from "react-select/async"
import { filterCollectionsAsOptions, collectionOptions } from "services"

type CollectionSelectProps = {
  multi: boolean
  shop_id: string
  onChange: (value: string | string[]) => void
  value: string | string[]
}

export interface SelectOption {
  key: string
  label: string
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, };
  }
}

const CollectionSelect: React.FC<CollectionSelectProps> = ({
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
      const options = filterCollectionsAsOptions(
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
          menuPortalTarget={document.body}
          cacheOptions
          closeMenuOnSelect={false}
          onChange={(option) => singleOnChange(option)}
          placeholder="Select collections"
          loadOptions={collectionOptions(shop_id)}
          className="w-full"
        />
      )}
      {multi && (
        <ReactSelect
          value={multiValue}
          isMulti
          menuPortalTarget={document.body}
          cacheOptions
          closeMenuOnSelect={false}
          onChange={(option) => multiOnChange(option)}
          placeholder="Select collections"
          loadOptions={collectionOptions(shop_id)}
          className="w-full"
        />
      )}
    </>
  )
}

export default CollectionSelect
