import React from "react"
import InfoTooltip from "./info-tooltip"

export type InputHeaderProps = {
  label?: string
  required?: boolean
  tooltipContent?: string
  tooltip?: React.ReactNode
}

const InputHeader: React.FC<InputHeaderProps> = ({
  label,
  required = false,
  tooltipContent,
  tooltip,
}) => {
  return (
    <div className="w-full flex text-md font-semibold text-grey-50 items-center">
      <label className="block text-sm font-semibold">{label}</label>
      {required && <div className="text-rose-50 "> *</div>}
      {tooltip || tooltipContent ? (
        <div className="flex ml-1.5">
          {tooltip || (
            <InfoTooltip
              content={tooltipContent}
              tooltipText={tooltipContent}
              tooltipProps={{}}
            />
          )}
        </div>
      ) : null}
    </div>
  )
}

export default InputHeader
