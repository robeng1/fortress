import{j as l,d as e,m as f,e as o}from"./vendor.58b0d04f.js";import{f as N}from"./index.e628a3e4.js";import{E as y}from"./EmptyState.bc697054.js";function v(a){const i=t=>{switch(t){case"Not tracked":return"bg-green-100 text-green-600";case"0 in stock":return"bg-red-100 text-red-600";default:return""}};return l("tr",{children:[e("td",{className:"px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px",children:e("div",{className:"flex items-center",children:l("label",{className:"inline-flex",children:[e("span",{className:"sr-only",children:"Select"}),e("input",{id:a.id,className:"form-checkbox",type:"checkbox",onChange:a.handleClick,checked:a.isChecked})]})})}),e("td",{onClick:a.handleShow,className:"cursor-pointer hover:underline px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap",children:l("div",{className:"flex items-center",children:[e("div",{className:"w-10 h-10 flex-shrink-0 mr-2 sm:mr-3",children:e("img",{className:"rounded",src:a.image,width:"40",height:"40",alt:a.name})}),e("div",{className:"font-medium text-gray-800",children:a.name})]})}),e("td",{className:"px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap",children:e("div",{className:`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${i(a.inventory)}`,children:a.inventory})}),e("td",{className:"px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap",children:e("div",{className:"text-left",children:a.type})}),e("td",{className:"px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap",children:e("div",{className:"text-left",children:a.status})}),e("td",{className:"px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap",children:e("div",{className:"text-center",children:a.variants})})]})}function w({product:a,handleShow:i}){const t=h=>{switch(h){case"Not tracked":return"bg-green-100 text-green-600";case"0 in stock":return"bg-red-100 text-red-600";default:return""}},{image:c,imageAlt:d,name:r,price:n,inventory:m}=a;return l("div",{onClick:i,children:[e("div",{className:"flex-shrink-0 w-[48px] h-[48px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden",children:e("img",{src:c,alt:d||"",className:"w-full h-full object-center object-cover"})}),l("div",{className:"ml-2 flex-1 flex flex-col pl-2",children:[e("div",{children:e("div",{className:"flex justify-between text-base font-medium text-gray-900",children:e("h3",{children:e("a",{href:"/",children:r})})})}),l("div",{className:"flex justify-between text-base font-medium text-gray-900",children:[e("p",{className:`mt-1 text-sm text-gray-500 rounded-full text-center px-2.5 py-0.5 ${t(m)}`,children:m}),e("p",{className:"ml-4 text-sm text-gray-500",children:n})]})]})]})}function g({handleShow:a,products:i}){return e(f,{children:e("div",{className:"md:hidden",children:e("div",{className:"mt-0",children:e("div",{className:"flow-root",children:e("ul",{className:"px-3 py-1 divide-y divide-gray-200",children:i.map(t=>e("li",{className:"flex pr-3 py-2",children:e(w,{handleShow:()=>a(!0,t.product_id),product:{id:t.product_id,image:t.image_url,name:t.title,inventory:`${t.num_in_stock} in stock`,type:t.product_type,status:t.product_status,variants:t.num_variants,fav:!1,price:N(t.price_int,t.currency)}})},t.product_id))})})})})})}function C({selectedItems:a,handleShow:i,products:t}){const[c,d]=o.exports.useState(!1),[r,n]=o.exports.useState([]),m=()=>{d(!c),n(t.map(s=>s.product_id)),c&&n([])},h=s=>{const{id:p,checked:x}=s.target;d(!1),n([...r,p]),x||n(r.filter(u=>u!==p))};return o.exports.useEffect(()=>{a(r)},[r]),e(f,{children:t.length>0?l("div",{className:"border border-transparent focus:outline-none rounded-md shadow-lg bg-white appearance-none relative",children:[e(g,{handleShow:i,products:t}),e("div",{className:"hidden md:block",children:e("div",{className:"overflow-x-auto",children:l("table",{className:"table-auto w-full",children:[e("thead",{className:"text-xs font-semibold uppercase text-gray-500 bg-gray-50",children:l("tr",{children:[e("th",{className:"px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px",children:e("div",{className:"flex items-center",children:l("label",{className:"inline-flex",children:[e("span",{className:"sr-only",children:"Select all"}),e("input",{className:"form-checkbox",type:"checkbox",checked:c,onChange:m})]})})}),e("th",{className:"px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap",children:e("div",{className:"font-semibold text-left",children:"Product"})}),e("th",{className:"px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap",children:e("div",{className:"font-semibold text-left",children:"Inventory"})}),e("th",{className:"px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap",children:e("div",{className:"font-semibold text-left",children:"Type"})}),e("th",{className:"px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap",children:e("div",{className:"font-semibold text-left",children:"Status"})}),e("th",{className:"px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap",children:e("div",{className:"font-semibold",children:"Variants"})})]})}),e("tbody",{className:"text-sm divide-y divide-gray-200",children:t.map(s=>e(v,{id:s.product_id,image:s.image_url,name:s.title,inventory:`${s.num_in_stock} in stock`,type:s.product_type,status:s.product_status,variants:s.num_variants,fav:!1,handleShow:()=>i(!0,s.product_id),handleClick:h,isChecked:r.includes(s.product_id)},s.product_id))})]})})})]}):e(y,{heading:"No products yet",msg:"Create some products to get started",action:{name:"Create product",func:()=>{i(!0,"")}}})})}export{C as default};
