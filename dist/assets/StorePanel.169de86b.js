var G=Object.defineProperty,A=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var b=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var y=(i,s,t)=>s in i?G(i,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[s]=t,o=(i,s)=>{for(var t in s||(s={}))P.call(s,t)&&y(i,t,s[t]);if(b)for(var t of b(s))L.call(s,t)&&y(i,t,s[t]);return i},f=(i,s)=>A(i,U(s));import{I as E,u as N,e as x,g as H,R as g,U as j,X as D,Y as O,d as e,m as T,F as I,j as a,ak as K,J as v}from"./vendor.b5508bda.js";import{s as M,a as $,r as q,f as B}from"./index.e01deede.js";function ee(){const i=E(),[s]=N(M),[t]=N($),w=`${B}/shops`,[p,h]=x.exports.useState(s==null?void 0:s.image),d=x.exports.useRef(null),{mutate:_}=H(l=>q(`${w}/${s==null?void 0:s.shop_id}`,{method:"PATCH",body:JSON.stringify(l)}),{onSuccess:l=>{i.setQueryData(["shop",t],l),v("Shop data updated succesffully")},onError:l=>{v("Could not update shop data due to "+l.message)}}),F=l=>{const c=l.successful[0].uploadURL;h(c)},u=g.useMemo(()=>new j({id:"shop-image",autoProceed:!0,restrictions:{maxFileSize:15*1024*1024,maxNumberOfFiles:1,minNumberOfFiles:1,allowedFileTypes:["image/*","video/*"]}}).use(D,{target:document.body}).on("complete",F).use(O,{endpoint:"https://storage.reoplex.com/files/"}),[]);g.useEffect(()=>()=>u.close(),[]);const C=l=>{const{files:c}=l.target;if(c&&c.length){const m=c[0];h(URL.createObjectURL(m));const n=m.name;u.addFile({data:m,name:n})}},S=()=>{var l;d!==null&&((l=d.current)==null||l.click())};return e(T,{children:e(I,{initialValues:{business_display_name:(s==null?void 0:s.business_display_name)||"",email:(s==null?void 0:s.email)||"",phone:(s==null?void 0:s.phone)||"",business_name:(s==null?void 0:s.business_name)||"",address:o({street:"",city:"",area:"",province:"",country:""},s==null?void 0:s.address),currency:o({name:"",iso_code:"GHS",symbol:""},s==null?void 0:s.currency)},onSubmit:(l,{setSubmitting:c})=>{_(f(o(o({},s),l),{image:p})),c(!1)},children:({values:l,errors:c,touched:m,handleChange:n,handleBlur:r,setFieldValue:V,setFieldError:W,setValues:X,setFieldTouched:J,handleSubmit:k,isSubmitting:Q})=>a("div",{className:"flex-grow",children:[a("div",{className:"md:p-6 p-4 space-y-6",children:[e("h2",{className:"text-2xl text-gray-800 font-bold mb-5",children:"My Store"}),e("section",{children:a("div",{className:"flex items-center",children:[e("div",{className:"store-image-upload-progress-indicator"}),a("div",{className:"mr-4 store-image-drop-area",children:[e("img",{className:"w-100 h-100",src:p||"https://via.placeholder.com/150",width:"150",height:"150",alt:s==null?void 0:s.business_display_name}),e("input",{style:{display:"none"},ref:d,onChange:C,type:"file"}),e(K,{uppy:u,fixed:!0,hideAfterFinish:!1})]}),e("button",{onClick:S,className:"btn-sm bg-blue-600 self-start hover:bg-purple-600 text-white",children:"Change"})]})}),a("section",{children:[e("h2",{className:"text-xl leading-snug text-gray-800 font-bold mb-1",children:"General Details"}),e("div",{className:"text-sm",children:"General information about your Business"}),e("div",{className:"sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:a("div",{className:"w-full md:w-1/2",children:[e("label",{className:"block text-sm font-medium mb-1",htmlFor:"business_display_name",children:"Name"}),e("input",{onChange:n,onBlur:r,id:"business_display_name",name:"business_display_name",className:"form-input w-full",value:l.business_display_name,type:"text",autoComplete:"business name",placeholder:"Rocketship"})]})}),a("div",{className:"sm:flex sm:items-center sm:w-1/2 space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:[a("div",{className:"sm:w-1/2",children:[e("label",{className:"block text-sm font-medium mb-1",htmlFor:"email",children:"Email"}),e("input",{onChange:n,onBlur:r,id:"email",name:"email",value:l.email,className:"form-input w-full",type:"email",autoComplete:"email",placeholder:"romeo@reoplex.com"})]}),a("div",{className:"sm:w-1/2",children:[e("label",{className:"block text-sm font-medium mb-1",htmlFor:"phone",children:"Phone"}),e("input",{id:"phone",name:"phone",className:"form-input w-full",value:l.phone,onChange:n,onBlur:r,type:"tel",autoComplete:"phone",placeholder:"+233246493078"})]})]})]}),a("section",{children:[e("h2",{className:"text-xl leading-snug text-gray-800 font-bold mb-1",children:"Legal Details"}),a("div",{className:"text-sm",children:["Registration information about your business.",e("br",{})," Only fill this if your business is registered.",e("br",{})," The address you use here will appear on your invoices"]}),e("div",{className:"sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:a("div",{className:"w-full md:w-1/2",children:[e("label",{className:"block text-sm font-medium mb-1",htmlFor:"business_name",children:"Legal Name"}),e("input",{id:"business_name",name:"business_name",value:l.business_name,onChange:n,onBlur:r,className:"form-input w-full",type:"text",placeholder:"Rocketship LLC."})]})}),e("div",{className:"sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:a("div",{className:"w-full md:w-1/2",children:[e("label",{className:"block text-sm font-medium mb-1",htmlFor:"address.street",children:"Street Address"}),e("input",{id:"address.street",name:"address.street",className:"form-input w-full",value:l.address.street,onChange:n,onBlur:r,type:"text",autoComplete:"street-address",placeholder:"8th Street"})]})}),a("div",{className:"sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:[a("div",{className:"sm:w-1/3",children:[e("label",{className:"block text-sm font-medium mb-1",htmlFor:"address.country",children:"Country"}),a("select",{id:"address.country",name:"address.country",onChange:n,onBlur:r,value:l.address.country,autoComplete:"country",className:"form-select block w-full",children:[e("option",{value:"",children:"Please Select"}),e("option",{value:"GH",children:"Ghana"}),e("option",{value:"NG",children:"Nigeria"}),e("option",{value:"RW",children:"Rwanda"}),e("option",{value:"KY",children:"Kenya"}),e("option",{value:"SA",children:"South Africa"})]})]}),a("div",{className:"sm:w-1/3",children:[e("label",{className:"block text-sm font-medium mb-1",htmlFor:"address.city",children:"City"}),e("input",{id:"address.city",value:l.address.city,onChange:n,onBlur:r,name:"address.city",className:"form-input w-full",type:"text",placeholder:"Accra"})]})]}),a("div",{className:"sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:[a("div",{className:"sm:w-1/3",children:[e("label",{className:"block text-sm font-medium mb-1",htmlFor:"province",children:"Province or Region"}),e("input",{id:"address.province",name:"address.province",onChange:n,onBlur:r,className:"form-input w-full",type:"text",value:l.address.province,autoComplete:"region",placeholder:"Greater Accra"})]}),a("div",{className:"sm:w-1/3",children:[e("label",{className:"block text-sm font-medium mb-1",htmlFor:"post-code",children:"Digital Address/Postal code"}),e("input",{id:"post-code",className:"form-input w-full",type:"text",autoComplete:"postal-code",placeholder:"G7HSED23"})]})]})]}),a("section",{children:[e("h2",{className:"text-xl leading-snug text-gray-800 font-bold mb-1",children:"Store currency"}),a("div",{className:"text-sm",children:["This is the primary currency your products will be sold in",e("br",{}),e("b",{children:"Multi currency is enabled for all stores by default and exchange rates may apply"}),".",e("br",{})," Primary currency cannot be changed after first sale"]}),e("div",{className:"sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:a("div",{className:"sm:w-1/3",children:[e("label",{className:"block text-sm font-medium mb-1",htmlFor:"currency.iso_code",children:"Currency"}),a("select",{id:"currency.iso_code",name:"currency.iso_code",onChange:n,onBlur:r,value:l.currency.iso_code,className:"form-select w-full",placeholder:"GHS",children:[e("option",{value:"",children:"Please select"}),e("option",{value:"GHS",children:"GHS"}),e("option",{value:"NGN",children:"NGN"}),e("option",{value:"ZAR",children:"ZAR"}),e("option",{value:"RWF",children:"RWF"}),e("option",{value:"UGX",children:"UGX"}),e("option",{value:"KES",children:"KES"})]})]})})]})]}),e("footer",{className:"sticky bottom-0",children:e("div",{className:"flex flex-col px-6 py-5 border-t border-gray-200",children:a("div",{className:"flex self-end",children:[e("button",{className:"btn border-gray-200 hover:border-gray-300 text-gray-600",children:"Cancel"}),e("button",{onClick:R=>{R.preventDefault(),k()},className:"btn bg-blue-600 bg-opacity-100 rounded-lg  text-white ml-3",children:"Save Changes"})]})})})]})})})}export{ee as default};