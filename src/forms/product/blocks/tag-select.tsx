import React, { useEffect, useState } from 'react'
import { MultiValue, SingleValue } from 'react-select';
import ReactSelect from 'react-select/async-creatable';
import {
  tagOptions,
} from 'services';

type TagProps = {
  multi: boolean
  shop_id: string
  onChange: (value: string | string[]) => void
  value: string | string[]
}

export interface SelectOption {
  key: string;
  label: string;
}



const Tag: React.FC<TagProps> = ({ multi, onChange, value, shop_id }) => {
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
    if (value && value.length > 0) {
      let tags: SelectOption[] = [];
      for (const tag of value) {
        if (typeof tag === 'string') {
          tags.push({ label: tag, key: tag });
        } else if (typeof tag === 'object') {
          tags.push(tag);
        }
      }
    }
  }, [])


  return (
    <>
      {!multi &&
        <ReactSelect
          value={singleValue}
          menuPortalTarget={document.body}
          cacheOptions
          closeMenuOnSelect={false}
          onChange={option =>
            singleOnChange(option)
          }
          placeholder="Select tags"
          loadOptions={tagOptions(shop_id)}

          className="w-full"
        />
      }
      {multi &&
        <ReactSelect
          value={multiValue}
          isMulti
          menuPortalTarget={document.body}
          cacheOptions
          closeMenuOnSelect={false}
          onChange={option =>
            multiOnChange(option)
          }
          placeholder="Select/Create tags"
          loadOptions={tagOptions(shop_id)}
          className="w-full"
        />
      }
    </>
  )
}

export default Tag
