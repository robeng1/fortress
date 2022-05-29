import React from "react"
import clsx from "clsx"
import { MouseEventHandler } from "react"

type InputContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  key?: string
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  onFocusLost?: () => void
}

const InputContainer: React.FC<InputContainerProps> = ({
  key,
  onClick,
  onFocusLost,
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      key={key}
      tabIndex={-1}
      onClick={onClick}
      onBlur={(e) => {
        if (onFocusLost && !e.currentTarget.contains(e.relatedTarget)) {
          onFocusLost()
        }
      }}
      className={clsx([
        `bg-grey-5  w-full p-3 flex h-18 flex-col cursor-text border border-grey-20 focus-within:shadow-input focus-within:border-purple-60 rounded-md`,
        className,
      ])}
    >
      {children}
    </div>
  )
}

export default InputContainer
