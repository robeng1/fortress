import { Link as RLink, LinkProps } from "react-router-dom"

const Link: React.FC<LinkProps & { className?: string }> = ({
  to,
  children,
  ...props
}) => {
  return (
    <RLink to={to}>
      <a {...props}>{children}</a>
    </RLink>
  )
}

export default Link
