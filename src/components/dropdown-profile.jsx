import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import Transition from "../utils/transition"

import { useAtom } from "jotai"
import { clearSessionAtom } from "store/authorization-atom"
import useShop from "hooks/use-shop"
import { proxyURL } from "utils/urlsigner"

function DropdownProfile({ align, shopName = "Demo" }) {
  const { shop } = useShop()
  const [, clearSession] = useAtom(clearSessionAtom)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const trigger = useRef(null)
  const dropdown = useRef(null)

  const handleLogout = (e) => {
    e.preventDefault()
    clearSession()
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setDropdownOpen(false)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return
      setDropdownOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {shop && shop.image && shop.image != "" && (
          <img
            className="w-8 h-8 rounded-full"
            src={proxyURL(shop.image, 50, 50)}
            width="32"
            height="32"
            alt="User"
          />
        )}
        {!(shop && shop.image) && (
          <div className="w-8 h-8 flex justify-center items-center rounded-full bg-purple-500 text-xl text-white uppercase">
            {shopName.charAt(0)}
          </div>
        )}
        <div className="hidden md:flex  items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
            {shopName.charAt(0).toUpperCase() + shopName.slice(1)}
          </span>
          <svg
            className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
            <div className="font-medium text-gray-800">
              {shopName.charAt(0).toUpperCase() + shopName.slice(1)}
            </div>
            <div className="text-xs text-gray-500 italic">Admin</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-purple-500 hover:text-purple-600 flex items-center py-1 px-3"
                to="/settings/account"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                className="font-medium text-sm text-purple-500 hover:text-purple-600 flex items-center py-1 px-3"
                onClick={(e) => {
                  setDropdownOpen(!dropdownOpen)
                  handleLogout(e)
                }}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default DropdownProfile
