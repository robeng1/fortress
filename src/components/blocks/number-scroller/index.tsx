import clsx from "clsx"
import React from "react"

type NumberScrollerProps = {
  numbers: number[]
  selected: number
  onSelect: (value: number) => void
} & React.HTMLAttributes<HTMLDivElement>

const NumberScroller: React.FC<NumberScrollerProps> = ({
  numbers,
  selected,
  onSelect,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        "flex flex-col time-list h-[305px] overflow-y-auto",
        className
      )}
    >
      {numbers.map((n) => {
        return (
          <div
            className={clsx(
              "w-[40px] h-[40px] last:mb-4 rounded inter-base-regular hover:bg-grey-20",
              {
                "bg-purple-60 hover:bg-purple-50 text-grey-0 inter-base-semibold":
                  n === selected,
              }
            )}
          >
            <button onClick={() => onSelect(n)} className="w-full h-full py-2">
              {n.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default NumberScroller
