import{j as t,m as i,d as e}from"./vendor.58b0d04f.js";import{E as d}from"./EmptyState.bc697054.js";function c({discount:a,handleShow:r}){return t(i,{children:[e("div",{onClick:()=>r(!0,a.discount_id),className:"flex-shrink-0 w-[48px] h-[48px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden",children:e("img",{src:a.cover_photo,alt:a.name,className:"w-full h-full object-center object-cover"})}),t("div",{className:"ml-2 flex-1 flex flex-col pl-2",children:[e("div",{children:e("div",{className:"flex justify-between text-base font-medium text-gray-900",children:e("h3",{children:e("a",{href:"/",children:a.name})})})}),t("div",{className:"flex justify-between text-base font-medium text-gray-900",children:[t("p",{className:"mt-1 text-sm text-gray-500 rounded-full text-center px-2.5 py-0.5",children:["Used ",a.num_applications," times"]}),e("p",{className:"ml-4 text-sm text-gray-500",children:a.status})]})]})]})}function n({handleShow:a,discounts:r}){return e(i,{children:e("div",{className:"md:hidden",children:e("div",{className:"mt-0",children:e("div",{className:"flow-root",children:e("ul",{className:"px-3 py-1 divide-y divide-gray-200",children:r.map(s=>e("li",{className:"flex pr-3 py-2",children:e(c,{handleShow:a,discount:s})},s.discount_id))})})})})})}function h({selectedItems:a,handleShow:r,discounts:s}){return e(i,{children:s.length>0?t("div",{className:"border border-transparent focus:outline-none rounded-md shadow-lg bg-white appearance-none relative",children:[e(n,{handleShow:r,discounts:s}),e("div",{className:"md:flex flex-col hidden",children:e("div",{className:"-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8",children:e("div",{className:"py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8",children:e("div",{className:"shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg",children:t("table",{className:"min-w-full divide-y divide-gray-200",children:[e("thead",{className:"bg-gray-50",children:t("tr",{children:[e("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Name"}),e("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Type"}),e("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Status"}),e("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Usage"}),e("th",{scope:"col",className:"relative px-6 py-3",children:e("span",{className:"sr-only",children:"Edit"})})]})}),e("tbody",{className:"bg-white divide-y divide-gray-200",children:s.map(l=>t("tr",{children:[e("td",{className:"px-6 py-4 whitespace-nowrap",children:t("div",{className:"flex items-center",children:[e("div",{className:"flex-shrink-0 h-10 w-10",children:e("img",{className:"h-10 w-10 rounded",src:l.photo,alt:l.name})}),t("div",{className:"ml-4",children:[e("div",{className:"text-sm font-medium text-gray-900",children:l.name}),e("div",{className:"text-sm text-gray-500",children:l.title})]})]})}),e("td",{className:"px-6 py-4 whitespace-nowrap",children:e("div",{className:"text-sm text-gray-900",children:l.type})}),e("td",{className:"px-6 py-4 whitespace-nowrap",children:e("span",{className:"px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800",children:l.status})}),e("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:l.num_applications}),e("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:e("button",{className:"text-purple-600 hover:text-purple-900",children:"Edit"})})]},l.discount_id))})]})})})})})]}):e(d,{heading:"No discounts yet",msg:"Create some discounts to get started",action:{name:"Create discount",func:()=>r(!0,"")}})})}export{h as default};
