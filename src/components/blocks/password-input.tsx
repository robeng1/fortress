import { Eye } from "components/icons/eye-icon"
import { EyeOff } from "components/icons/eye-off-icon"
import cn from "classnames"
import React, { InputHTMLAttributes, useState } from "react"
import { NavLink as Link } from "react-router-dom"

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  inputClassName?: string
  forgotPassHelpText?: string
  label: string
  name: string
  forgotPageLink?: string
  shadow?: boolean
  variant?: "normal" | "solid" | "outline"
  error: string | undefined
}
const classes = {
  root: "px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
  normal:
    "bg-light border border-gray-300 focus:shadow focus:bg-light focus:border-3",
  solid: "bg-light border border-border-100 focus:bg-light focus:border-3",
  outline: "border border-border-base focus:border-3",
  shadow: "focus:shadow",
}
const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      forgotPassHelpText,
      label,
      name,
      error,
      children,
      variant = "normal",
      shadow = false,
      type = "text",
      forgotPageLink = "",
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false)

    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === "normal",
        [classes.solid]: variant === "solid",
        [classes.outline]: variant === "outline",
      },
      shadow === true && classes.shadow,
      inputClassName
    )

    return (
      <div className={className}>
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor={name}
            className="text-body-dark font-semibold text-sm leading-none"
          >
            {label}
          </label>

          {forgotPageLink && forgotPassHelpText && (
            <Link
              to={forgotPageLink}
              className="text-sm text-purple-500 transition-colors duration-200 focus:outline-none focus:text-accent-700 focus:font-semibold hover:text-purple-600"
            >
              {forgotPassHelpText}
            </Link>
          )}
        </div>
        <div className="relative">
          <input
            id={name}
            name={name}
            type={show ? "text" : "password"}
            ref={ref}
            className={rootClassName}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...rest}
          />
          <label
            htmlFor={name}
            className="absolute right-[10px] top-5 -mt-2 text-body"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </label>
        </div>
        {error && (
          <p className="my-2 text-xs text-start text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

export default PasswordInput
