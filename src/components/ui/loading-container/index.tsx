import * as React from "react"
import Spinner from "components/blocks/spinner"

type LoadingContainerProps = {
  isLoading: boolean
  placeholder?: React.ReactElement
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({
  isLoading,
  children,
  placeholder,
  ...props
}) => {
  placeholder = placeholder || <Spinner size="lg" variant="secondary" />

  if (isLoading) {
    return (
      <div
        className="w-full pt-2xl flex items-center justify-center min-h-[756px]"
        {...props}
      >
        {placeholder}
      </div>
    )
  }
  return children as React.ReactElement
}

export default LoadingContainer