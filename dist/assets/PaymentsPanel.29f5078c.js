var k=Object.defineProperty;var f=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var N=(l,a,e)=>a in l?k(l,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[a]=e,i=(l,a)=>{for(var e in a||(a={}))A.call(a,e)&&N(l,e,a[e]);if(f)for(var e of f(a))T.call(a,e)&&N(l,e,a[e]);return l};import{I as F,u as m,g as x,d as t,m as M,F as B,j as n,J as g}from"./vendor.b5508bda.js";import{s as I,b as P,a as D,r as w,p as L}from"./index.e01deede.js";var c;(function(l){l[l.OPEN=0]="OPEN",l[l.FROZEN=1]="FROZEN",l[l.CLOSED=2]="CLOSED"})(c||(c={}));var d;(function(l){l[l.BANK_CARD=0]="BANK_CARD",l[l.MOBILE_NETWORK=1]="MOBILE_NETWORK"})(d||(d={}));var v;(function(l){l[l.CREDIT=0]="CREDIT",l[l.DEBIT=1]="DEBIT"})(v||(v={}));function W(){var p,h,b;const l=F(),[a]=m(I),[e]=m(P),[E]=m(D),u=`${L}/${E}/accounts`,{mutate:_}=x(s=>w(u,{method:"POST",body:JSON.stringify(s)}),{onSuccess:s=>{l.invalidateQueries(["account",a==null?void 0:a.shop_id]),g("Payment data updated succesffully")},onError:s=>{g("Could not update payment data due to "+s.message)}}),{mutate:C}=x(s=>w(`${u}/${e==null?void 0:e.account_id}`,{method:"PATCH",body:JSON.stringify(s)}),{onSuccess:s=>{l.invalidateQueries(["account",a==null?void 0:a.shop_id])},onError:s=>{}});return t(M,{children:t(B,{initialValues:{account_id:(e==null?void 0:e.account_id)||"",name:(a==null?void 0:a.business_name)||"",primary_user:a==null?void 0:a.shop_id,payment_data:(e==null?void 0:e.payment_data)||"wallet",wallet:{merchant:((p=e==null?void 0:e.wallet)==null?void 0:p.merchant)||"",name:((h=e==null?void 0:e.wallet)==null?void 0:h.name)||"",number:((b=e==null?void 0:e.wallet)==null?void 0:b.number)||""},payment_mode:(e==null?void 0:e.payment_mode)||d.MOBILE_NETWORK,status:(e==null?void 0:e.status)||c.OPEN,account_kind:(e==null?void 0:e.account_kind)||"REGULAR"},onSubmit:(s,{setSubmitting:y})=>{s.account_id!==""?C(i(i({},e),s)):_(i({},s)),y(!1)},children:({values:s,errors:y,touched:S,handleChange:o,handleBlur:r,setFieldValue:j,setFieldError:V,setValues:$,setFieldTouched:q,handleSubmit:O,isSubmitting:J})=>n("div",{className:"flex-grow",children:[n("div",{className:"md:p-6 p-4 space-y-6",children:[t("h2",{className:"text-2xl text-gray-800 font-bold mb-5",children:"Payout settings"}),n("section",{children:[t("h3",{className:"text-xl leading-snug text-gray-800 font-bold mb-1",children:"Mobile Money"}),t("div",{className:"text-sm",children:"Your Mobile Money account details"}),t("div",{className:"sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:n("div",{className:"w-full md:w-1/2",children:[t("label",{className:"block text-sm font-medium mb-1",htmlFor:"name",children:"Name of Account"}),t("input",{id:"name",name:"name",value:s.name,onChange:o,onBlur:r,className:"form-input w-full",type:"text",autoComplete:"account-name",placeholder:"Romeo Obeng"})]})}),n("div",{className:"sm:flex sm:items-center sm:w-1/2 space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:[n("div",{className:"w-1/2",children:[t("label",{className:"block text-sm font-medium mb-1",htmlFor:"wallet.merchant",children:"Provider"}),n("select",{id:"wallet.merchant",name:"wallet.merchant",value:s.wallet.merchant,onChange:o,onBlur:r,autoComplete:"provider",className:"form-select block w-full",children:[t("option",{value:"",children:"Please Select"}),t("option",{value:"MTN",children:"MTN"}),t("option",{value:"Vodafone",children:"Vodafone"}),t("option",{value:"AirtelTigo",children:"AirtelTigo"})]})]}),n("div",{className:"w-full",children:[t("label",{className:"block text-sm font-medium mb-1",htmlFor:"wallet.number",children:"Phone"}),t("input",{id:"wallet.number",name:"wallet.number",className:"form-input w-full",type:"tel",value:s.wallet.number,onChange:o,onBlur:r,autoComplete:"phone",placeholder:"+233246493078"})]})]}),t("div",{className:"sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:n("div",{className:"w-full md:w-1/2",children:[t("label",{className:"block text-sm font-medium mb-1",htmlFor:"payout-descriptor",children:"How should we describe the transaction during payout?"}),t("input",{id:"payout-descriptor",className:"form-input w-full",type:"text",placeholder:"Rocketship Store Revenue"}),t("p",{className:"text-blue-500 text-xs",children:"This will used as Mobile Money Reference/Bank Invoice name during payout"})]})})]}),n("section",{children:[t("h3",{className:"text-xl leading-snug text-gray-800 font-bold mb-1",children:"Bank Account"}),t("ul",{children:t("li",{className:"flex justify-between items-center py-3 border-b border-gray-200",children:t("div",{children:t("div",{className:"text-gray-800 font-semibold italic",children:"Only Mobile Money is supported now. Bank support is coming soon"})})})})]})]}),t("footer",{className:"sticky bottom-0",children:t("div",{className:"flex flex-col px-6 py-5 border-t border-gray-200",children:n("div",{className:"flex self-end",children:[t("button",{className:"btn border-gray-200 hover:border-gray-300 text-gray-600",children:"Cancel"}),t("button",{onClick:R=>{R.stopPropagation(),O()},className:"btn bg-blue-600 bg-opacity-100 rounded-lg  text-white ml-3",children:"Save Changes"})]})})})]})})})}export{W as default};
