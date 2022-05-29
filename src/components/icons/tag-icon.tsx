import React from "react"
import IconProps from "types/icon-type"

export const TagIcon: React.FC<IconProps> = ({
  size = "24",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id="body_1"
      width="22"
      height="22"
    >
      <g transform="matrix(0.44 0 0 0.44 0 0)">
        <path d="M0 0L50 0L50 50L0 50z" stroke="none" fill="none" />
        <path
          d="M42 11C 42 11.828427 41.707108 12.535534 41.12132 13.121321C 40.535534 13.707108 39.82843 14.000001 39 14C 38.171574 14.000001 37.46447 13.707108 36.87868 13.121321C 36.292892 12.535534 36 11.828427 36 11C 36 10.171574 36.292892 9.464466 36.87868 8.878679C 37.46447 8.292893 38.171574 8 39 8C 39.82843 8 40.535534 8.292893 41.12132 8.878679C 41.707108 9.464466 42 10.171574 42 11C 42 11.03491 41.99939 11.06981 41.998173 11.104698"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="square"
          fill="none"
        />
        <path
          d="M47 5.5C 47 4.119 45.881 3 44.5 3C 44.344 3 29.624 3.002 29.624 3.002C 28.294 3.002 27.021 2.9320002 26.283 3.67L26.283 3.67L3.554 26.398C 2.8149998 27.136002 2.8149998 28.334002 3.554 29.072L3.554 29.072L20.928001 46.446C 21.666002 47.184 22.864002 47.184 23.602001 46.446L23.602001 46.446L46.33 23.717C 47.068 22.98 46.998 21.737 46.998 20.376999C 46.998 20.377 47 5.656 47 5.5z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="square"
          fill="none"
        />
      </g>
    </svg>
  )
}

export default TagIcon
