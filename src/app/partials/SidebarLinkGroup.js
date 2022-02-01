import React, { useState } from 'react';

function SidebarLinkGroup({ children, activecondition }) {
  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={`px-3 py-2 rounded-lg mb-0.5 last:mb-0 font-semibold ${
        activecondition &&
        'w-full bg-gray-200 shadow-lg ease-out transition-transform transition-medium'
      }`}
    >
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;
