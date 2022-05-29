import clsx from "clsx"
import React from "react"

type SpinnerProps = {
  size?: "lg" | "md" | "sm"
  variant?: "primary" | "secondary"
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "lg",
  variant = "primary",
}) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        { "h-[24px] w-[24px]": size === "lg" },
        { "h-[20px] w-[20px]": size === "md" },
        { "h-[16px] w-[16px]": size === "sm" }
      )}
    >
      <div className="inline-block relative w-full h-full">
        <div
          className={clsx(
            "animate-ring border-2 h-4/5 w-4/5 rounded-circle border-transparent",
            { "border-t-grey-0": variant === "primary" },
            { "border-t-purple-60": variant === "secondary" }
          )}
        />
      </div>
    </div>
  )
}

export default Spinner
