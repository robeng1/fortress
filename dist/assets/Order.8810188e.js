import{ac as O,u as U,e as P,z as L,g as k,d as l,m as u,j as s}from"./vendor.58b0d04f.js";import{a as F,d as i,e as o,g as n,b as M,r as b}from"./index.e628a3e4.js";import{L as j}from"./Loader.be86b23a.js";var g;(function(e){e[e.FBS=0]="FBS",e[e.SR=1]="SR",e[e.LR=2]="LR",e[e.FBSLR=3]="FBSLR"})(g||(g={}));var r;(function(e){e[e.ORDER_PENDING=0]="ORDER_PENDING",e[e.ORDER_RECEIVED=1]="ORDER_RECEIVED",e[e.ORDER_INSPECTION=3]="ORDER_INSPECTION",e[e.ORDER_ACCEPTED=4]="ORDER_ACCEPTED",e[e.ORDER_PROCESSING=5]="ORDER_PROCESSING",e[e.ORDER_DISPATCHED=6]="ORDER_DISPATCHED",e[e.ORDER_COMPLETED=7]="ORDER_COMPLETED",e[e.ORDER_ASTERISK=8]="ORDER_ASTERISK",e[e.ORDER_ATTENTION=9]="ORDER_ATTENTION",e[e.ORDER_DECLINED=10]="ORDER_DECLINED",e[e.COURIER_ON_ROUTE_TO_PICK_UP=11]="COURIER_ON_ROUTE_TO_PICK_UP",e[e.COURIER_ON_ROUTE_TO_PICK_UP_FOR_SRC_CENTRE=12]="COURIER_ON_ROUTE_TO_PICK_UP_FOR_SRC_CENTRE",e[e.COURIER_ON_ROUTE_TO_SRC_CENTRE=13]="COURIER_ON_ROUTE_TO_SRC_CENTRE",e[e.ORDER_RECEIVED_AT_SRC_CENTRE=14]="ORDER_RECEIVED_AT_SRC_CENTRE",e[e.ORDER_DISPATCHED_FROM_SRC_CENTRE=15]="ORDER_DISPATCHED_FROM_SRC_CENTRE",e[e.ORDER_RECEIVED_AT_DST_CENTRE=16]="ORDER_RECEIVED_AT_DST_CENTRE",e[e.ENROUTE=17]="ENROUTE",e[e.READY=18]="READY",e[e.AWAITING_PAYMENT=19]="AWAITING_PAYMENT",e[e.AUTHORIZED=20]="AUTHORIZED",e[e.PAYMENT_DECLINED=21]="PAYMENT_DECLINED"})(r||(r={}));var p;(function(e){e[e.DEBIT=0]="DEBIT",e[e.FAILURE=1]="FAILURE",e[e.CREDIT=2]="CREDIT",e[e.AUTHORISE=3]="AUTHORISE",e[e.RELEASE=4]="RELEASE",e[e.REFUND=5]="REFUND"})(p||(p={}));var D;(function(e){e[e.DISPATCHED=0]="DISPATCHED",e[e.RETURNED=1]="RETURNED"})(D||(D={}));function S({handleShow:e,id:C}){var E;const w=O(),[d]=U(M),[c]=P.exports.useState(C),x=`${F}/shops/${d==null?void 0:d.shop_id}/orders`,{data:a,isLoading:v}=L(["order",c],async()=>await b(`${x}/${c}`),{enabled:!!c,keepPreviousData:!0}),{mutate:m}=k(t=>b(`${x}/${c}/set-status`,{method:"PATCH",body:JSON.stringify({order_id:c,status:t})}),{onSuccess:()=>w.invalidateQueries(["order",c]),onError:t=>{}}),I=t=>{t.preventDefault(),m(r.ORDER_COMPLETED)},A=t=>{t.preventDefault(),m(r.ORDER_PROCESSING)},h=t=>{t.preventDefault(),m(r.ORDER_DECLINED)};return l(u,{children:v?l(j,{}):l(u,{children:!!a&&a!==void 0&&s("main",{className:"flex-1 pt-12 px-2 md:px-4 w-full h-full overflow-auto bg-gray-100 mb-3",children:[s("header",{className:"flex",children:[s("button",{onClick:()=>e(!1,void 0),className:"inline-flex text-gray-600",children:[l("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",className:"fill-current h-6 text-gray-600",children:l("path",{d:"M12 16c-.256 0-.512-.098-.707-.293l-5-5c-.39-.39-.39-1.023 0-1.414l5-5c.39-.39 1.023-.39 1.414 0s.39 1.023 0 1.414L8.414 10l4.293 4.293c.39.39.39 1.023 0 1.414-.195.195-.45.293-.707.293z"})}),l("span",{children:"Orders"})]}),l("button",{className:"flex-none hover:bg-gray-300 ml-auto px-1 py-1 rounded",children:l("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",id:"back",className:"fill-current h-5 text-gray-600",children:l("path",{d:"M22.4 10.2H7.1c-.5 0-.6-.6-.4-.8l4.5-4.5c.2-.2.2-.7 0-.9l-1-1c-.3-.3-.7-.3-1 0l-8.1 8c-.3.3-.3.7 0 1l8.1 8.1c.3.3.7.3 1 0l.9-1c.3-.3.3-.7 0-1l-4.4-4.4c-.3-.3-.1-.8.3-.8h15.3c.4 0 .7-.3.7-.7v-1.4c.1-.3-.2-.6-.6-.6z"})})}),l("button",{className:"flex-none hover:bg-gray-300 ml-2 px-1 py-1 rounded",children:l("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",id:"forward",className:"fill-current h-5 text-gray-600",children:l("path",{d:"M1.6 13.4h15.3c.4 0 .6.5.3.8l-4.4 4.4c-.3.3-.3.7 0 1l1 1c.3.3.7.3 1 0l8-8.1c.3-.3.3-.7 0-1l-8-8.1c-.3-.3-.7-.3-1 0l-1 1c-.2.3-.2.7 0 1l4.5 4.4c.2.3.1.8-.4.8H1.6c-.4 0-.7.3-.7.7v1.3c0 .4.3.8.7.8z"})})})]}),l("div",{className:"mt-2 flex flex-initial items-baseline",children:s("div",{className:"flex md:flex-row flex-col flex-initial items-baseline align-middle shadow justify-start rounded-lg px-3 py-3",children:[s("h1",{className:"font-semibold text-2xl",children:["#",a.number]}),s("p",{className:"pl-3 text-gray-700",children:[new Date(a.created_at).toString()," from Draft Orders"]})]})}),s("section",{className:"flex flex-col md:flex-row mt-6 mb-20",children:[s("div",{className:"flex-1 mb-6 md:mr-4",children:[s("div",{className:"bg-white border mb-6 rounded shadow",children:[s("header",{className:"flex items-center pb-3 pl-6 pr-3 pt-5",children:[s("span",{className:"font-semibold inline-flex items-center text-gray-700",children:[l("i",{className:"border-2 border-dashed border-yellow-700 h-5 inline-block mr-3 rounded-full w-5 shadow-yellow-large"}),l("span",{children:a.status!==r.ORDER_COMPLETED?"Unfulfilled":"FulFilled"})]}),s("button",{className:"hidden md:inline-flex focus:bg-gray-300 focus:outline-none hover:text-gray-800 leading-snug ml-auto px-2 py-2 rounded text-gray-600",children:[l("span",{children:"375 Vanderbilt Avenue"}),l("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",className:"fill-current h-5 text-gray-600",children:l("path",{d:"M6.28 9.28l3.366 3.366c.196.196.512.196.708 0L13.72 9.28c.293-.293.293-.767 0-1.06-.14-.14-.332-.22-.53-.22H6.81c-.414 0-.75.336-.75.75 0 .2.08.39.22.53z"})})]})]}),(E=a.lines)==null?void 0:E.map(t=>{var R,N,_,f;return s("div",{className:"border-b flex mx-5 py-2",children:[l("div",{className:"flex-shrink-0 w-[60px] md:w-[48px]  align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden",children:l("img",{src:(N=(R=t.product)==null?void 0:R.image)==null?void 0:N.image_url,alt:(_=t.product)==null?void 0:_.title,className:"w-full h-full object-center object-cover"})}),s("div",{className:"flex md:flex-row flex-col justify-between w-full",children:[s("div",{className:"pl-2",children:[l("p",{className:"text-blue-600 text-sm overflow-ellipsis",children:(f=t.product)==null?void 0:f.title}),s("span",{className:"block md:mt-px text-gray-600 text-sm",children:["SKU: ",t.centre_sku]})]}),s("div",{className:"flex gap-x-5 md:gap-28 md:self-center self-start pl-2",children:[s("div",{className:"font-medium text-green-900 text-sm",children:[i(t.unit_price_incl_tax)," x"," ",t.quantity]}),l("div",{className:"font-medium text-green-900 text-sm",children:i(t.line_price_incl_tax)})]})]})]})}),s("footer",{className:"border-t flex md:flex-row flex-col justify-end px-5 py-4",children:[l("button",{onClick:A,type:"button",className:"text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-3 mb-3",children:"Mark as processing"}),l("button",{onClick:I,type:"button",className:"text-white bg-blue-900 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-3 mb-3",children:"Mark as fulfilled"}),l("button",{onClick:h,type:"button",className:"text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-3 mb-3",children:"Cancel"})]})]}),s("div",{className:"bg-white border rounded shadow",children:[l("span",{className:"font-semibold inline-flex items-center ml-6 mt-5 text-gray-700",children:l("span",{children:"Payment"})}),s("div",{className:"flex mt-4 mx-5 py-2 text-gray-700 text-sm",children:[l("span",{children:"Subtotal"}),l("span",{className:"ml-auto",children:i(a.total_excl_tax)})]}),s("div",{className:"flex mx-5 pb-2 text-gray-700 text-sm",children:[l("span",{className:"w-1/6",children:"Shipping"}),l("span",{className:"",children:"Manual (0.0kg)"}),l("span",{className:"ml-auto",children:i(a.shipping_incl_tax)})]}),s("div",{className:"flex mx-5 pb-2 text-gray-700 text-sm",children:[l("span",{className:"w-1/6",children:"Tax"}),l("span",{className:"ml-auto",children:o(n(a.total_incl_tax).subtract(n(a.total_excl_tax)))})]}),s("div",{className:"border-b flex font-bold mx-5 pb-2 text-gray-700 text-sm",children:[l("span",{children:"Total"}),l("span",{className:"ml-auto",children:o(n(a.total_incl_tax).add(n(a.shipping_incl_tax)))})]}),s("div",{className:"flex mx-5 pb-6 pt-3 text-gray-700 text-sm",children:[l("span",{children:"Paid by customer"}),l("span",{className:"ml-auto",children:o(n(a.total_incl_tax).add(n(a.shipping_incl_tax)))})]}),l("footer",{className:"border-t flex justify-end px-5 py-4",children:l("button",{onClick:h,type:"button",className:"text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3",children:"Refund"})})]})]}),s("div",{className:"md:w-1/3",children:[s("div",{className:"bg-white border p-5 rounded shadow",children:[s("header",{className:"flex justify-center",children:[l("span",{className:"font-medium text-base",children:"Notes"}),l("button",{className:"ml-auto text-blue-500 text-sm",children:"Edit"})]}),l("p",{className:"mt-4 text-gray-600 text-sm",children:"No notes from customer"})]}),s("div",{className:"bg-white border mt-4 rounded shadow",children:[s("header",{className:"flex p-5",children:[l("span",{className:"font-medium text-base",children:"Customer"}),l("span",{className:"bg-blue-800 flex h-8 items-center justify-center ml-auto relative rounded-full shadow-lg w-8",children:l("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",id:"user",className:"bottom-0 fill-current mt-3 text-white w-6",children:l("path",{d:"M23.1 19.8v1.1c0 1.2-1 2.2-2.2 2.2H3.1c-1.2 0-2.2-1-2.2-2.2v-1.1c0-2.6 3.2-4.3 6.1-5.6l.3-.1c.2-.1.5-.1.7 0 1.2.8 2.5 1.2 4 1.2s2.8-.4 3.9-1.2c.3-.1.5-.1.7 0l.3.1c3 1.3 6.2 2.9 6.2 5.6zM12 .9c3 0 5.5 2.7 5.5 6.1S15 13.1 12 13.1 6.5 10.4 6.5 7 9 .9 12 .9z"})})})]}),l("p",{className:"mt-4 px-5 text-blue-500 text-sm",children:a.customer_name}),l("span",{className:"block mb-5 px-5 text-gray-600 text-sm",children:"1 order"}),s("div",{className:"border-t pt-4 px-5",children:[s("header",{className:"flex items-center",children:[l("span",{className:"font-medium text-xs uppercase",children:"Contact Information"}),l("button",{className:"ml-auto text-blue-500",children:"Edit"})]}),l("span",{className:"block mb-5 mt-1 text-blue-500 text-sm",children:a.guest_email!==""?a.guest_email:a.customer_email}),l("span",{className:"block mb-5 mt-1 text-blue-500 text-sm",children:a.customer_phone})]}),s("div",{className:"border-t pt-4 px-5",children:[s("header",{className:"flex items-center",children:[l("span",{className:"font-medium text-xs uppercase",children:"Shipping Address"}),l("button",{className:"ml-auto text-blue-500 text-sm",children:"Edit"})]}),s("p",{className:"py-4 text-gray-600 text-sm",children:[a.customer_name,l("br",{}),a.shipping_address.data.street," ",l("br",{}),a.shipping_address.data.city,l("br",{}),a.shipping_address.data.province,l("br",{}),a.shipping_address.data.country]}),l("a",{href:"/",className:"block mb-5 text-blue-500 text-sm",children:"View map"})]}),s("div",{className:"border-t pb-4 pt-4 px-5",children:[l("header",{className:"flex",children:l("span",{className:"font-medium text-xs uppercase",children:"Billing Address"})}),l("p",{className:"mt-4 text-gray-600 text-sm",children:"Same as shipping address"})]})]})]})]})]})})})}export{S as default};
