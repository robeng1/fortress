import cn from "classnames"
import React, { InputHTMLAttributes } from "react"
import InputHeader from "./input-header"

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  inputClassName?: string
  label?: string
  note?: string
  name: string
  error?: string
  type?: string
  shadow?: boolean
  required?: boolean
  tooltipContent?: string
  tooltip?: React.ReactNode
  variant?: "normal" | "solid" | "outline"
}
const classes = {
  root: "px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
  normal:
    "bg-gray-50 border border-gray-300 focus:shadow focus:bg-light focus:border-3",
  solid: "bg-gray-50 border border-border-100 focus:bg-light focus:border-3",
  outline: "border border-border-base focus:border-3",
  shadow: "focus:shadow",
}
const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      note,
      name,
      error,
      required,
      children,
      variant = "normal",
      shadow = false,
      type = "text",
      tooltip,
      tooltipContent,
      inputClassName,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === "normal",
        [classes.solid]: variant === "solid",
        [classes.outline]: variant === "outline",
      },
      {
        [classes.shadow]: shadow,
      },
      inputClassName
    )

    return (
      <div className={className}>
        <InputHeader
          label={label}
          required={required}
          tooltip={tooltip}
          tooltipContent={tooltipContent}
        />
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          className={rootClassName}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-invalid={error ? "true" : "false"}
          {...rest}
        />
        {note && <p className="mt-2 text-xs text-body">{note}</p>}
        {error && (
          <p className="my-2 text-xs text-start text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

export default Input
