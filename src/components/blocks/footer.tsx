import React from "react"

export function Footer() {
  return (
    <footer className="py-4 px-5 self-start">
      <nav className="flex space-x-2">
        <a
          href="https://reoplex.com"
          className="font-semibold text-sm text-gray-500 hover:text-dark"
        >
          © Reoplex
        </a>
        <a
          href="https://reoplex.com/contact"
          className="font-semibold text-sm text-gray-500 hover:text-dark"
        >
          Contact
        </a>
        <a
          href="https://reoplex.com/terms"
          className="font-semibold text-sm text-gray-500 hover:text-dark"
        >
          Terms
        </a>
      </nav>
    </footer>
  )
}
