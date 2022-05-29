import cn from "classnames"
import clsx from "clsx"
import React, { Children, ButtonHTMLAttributes } from "react"
import Spinner from "components/blocks/spinner"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: "normal" | "outline" | "custom"
  size?: "big" | "md" | "sm"
  active?: boolean
  loading?: boolean
  disabled?: boolean
}
const classes = {
  root: "inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700",
  normal:
    "bg-purple-500 hover:bg-purple-600 text-white border border-transparent",
  custom: "border border-transparent",
  outline:
    "border border-border-400 bg-transparent text-body hover:text-light hover:bg-accent hover:border-accent",
  loading:
    "h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin",
  disabled:
    "border border-border-base bg-gray-300 border-border-400 text-body cursor-not-allowed",
  disabledOutline: "border border-border-base text-muted cursor-not-allowed",
  sm: "px-3 py-0 h-9 text-sm h-10",
  md: "px-5 py-0 h-12",
  big: "px-10 py-0 h-14",
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = "normal",
      size = "md",
      children,
      active,
      loading = false,
      disabled = false,
      ...rest
    } = props
    const classesName = cn(
      classes.root,
      {
        [classes.normal]: !disabled && variant === "normal",
        [classes.disabled]: disabled && variant === "normal",
        [classes.outline]: !disabled && variant === "outline",
        [classes.disabledOutline]: disabled && variant === "outline",
        [classes.sm]: size === "sm",
        [classes.md]: size === "md",
        [classes.big]: size === "big",
      },
      className
    )

    return (
      <button
        aria-pressed={active}
        data-variant={variant}
        ref={ref}
        className={classesName}
        disabled={disabled}
        {...rest}
      >
        {children}
        {loading && (
          <span
            className={classes.loading}
            style={{
              borderTopColor:
                variant === "outline" ? "currentColor" : "#ffffff",
            }}
          />
        )}
      </button>
    )
  }
)

export default Button

export type AltButtonProps = {
  variant: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const AltButton = React.forwardRef<HTMLButtonElement, AltButtonProps>(
  (
    {
      variant = "primary",
      size = "lg",
      loading = false,
      children,
      ...attributes
    },
    ref
  ) => {
    const handleClick = (e) => {
      if (!loading && attributes.onClick) {
        attributes.onClick(e)
      }
    }

    const variantClassname = clsx({
      ["btn-primary"]: variant === "primary",
      ["btn-secondary"]: variant === "secondary",
      ["btn-ghost"]: variant === "ghost",
      ["btn-danger"]: variant === "danger",
    })

    const sizeClassname = clsx({
      ["btn-lg"]: size === "lg",
      ["btn-md"]: size === "md",
      ["btn-sm"]: size === "sm",
    })

    return (
      <button
        {...attributes}
        className={clsx(
          "btn",
          variantClassname,
          sizeClassname,
          attributes.className
        )}
        disabled={attributes.disabled || loading}
        ref={ref}
        onClick={handleClick}
      >
        {loading ? (
          <Spinner size={size} variant={"secondary"} />
        ) : (
          Children.map(children, (child, i) => {
            return (
              <span key={i} className="mr-xs last:mr-0">
                {child}
              </span>
            )
          })
        )}
      </button>
    )
  }
)

export {AltButton}

