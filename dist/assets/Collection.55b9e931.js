var Y=Object.defineProperty,Z=Object.defineProperties;var ee=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var ae=Object.prototype.hasOwnProperty,se=Object.prototype.propertyIsEnumerable;var E=(o,r,l)=>r in o?Y(o,r,{enumerable:!0,configurable:!0,writable:!0,value:l}):o[r]=l,v=(o,r)=>{for(var l in r||(r={}))ae.call(r,l)&&E(o,l,r[l]);if(P)for(var l of P(r))se.call(r,l)&&E(o,l,r[l]);return o},_=(o,r)=>Z(o,ee(r));import{d as e,j as n,ac as te,u as le,e as u,z as O,g as w,R as ie,m as re,F as oe,ad as N}from"./vendor.58b0d04f.js";import{U as de,D as ce,T as ne,d as me}from"./index.df210139.js";/* empty css              */import{L as ue}from"./Loader.be86b23a.js";import{a as R,b as pe,r as f}from"./index.e628a3e4.js";import{S as he}from"./modal-searcher.562a0bef.js";import"./index.5f62a056.js";import"./memoize-one.esm.2caadecc.js";function ge({previous:o,next:r}){return e("div",{className:"mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between",children:e("nav",{className:"mb-4 sm:mb-0 sm:order-1",role:"navigation","aria-label":"Navigation",children:n("ul",{className:"flex justify-center",children:[e("li",{className:"ml-3 first:ml-0",children:n("a",{className:` ${o.disabled?"btn bg-white border-gray-200 text-gray-300 cursor-not-allowed":"btn bg-white border-gray-200 hover:border-gray-300 text-purple-500"}`,href:"#0",disabled:o.disabled,onClick:l=>{l.stopPropagation(),o.callBack()},children:[e("svg",{className:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z",clipRule:"evenodd"})}),"Previous"]})}),e("li",{className:"ml-3 first:ml-0",children:n("a",{className:` ${r.disabled?"btn bg-white border-gray-200 text-gray-300 cursor-not-allowed":"btn bg-white border-gray-200 hover:border-gray-300 text-purple-500"}`,href:"#0",disabled:o.disabled,onClick:l=>{l.stopPropagation(),r.callBack()},children:["Next",e("svg",{className:"w-5 h-5 ml-2",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z",clipRule:"evenodd"})})]})})]})})})}function Pe({handleShow:o,id:r}){var j;const l=te(),[i]=le(pe),g=`${R}/shops/${i==null?void 0:i.shop_id}/collections`,[c,S]=u.exports.useState(r),[T,D]=u.exports.useState([]),C="key",[L,B]=u.exports.useState(!1),{data:s,isLoading:M}=O(["collection",c],async()=>await f(`${g}/${c}`),{enabled:!!c,keepPreviousData:!0}),[k,U]=u.exports.useState((j=s==null?void 0:s.image)==null?void 0:j.image_url),[b,F]=u.exports.useState(""),[$,q]=u.exports.useState(""),I=20,{data:t}=O(["collection-products",b],async()=>await f(`${g}/${c}/products?page=${b}&num=${I}`),{keepPreviousData:!0,enabled:!!c}),{mutate:Q}=w(a=>f(g,{method:"POST",body:JSON.stringify(a)}),{onSuccess:a=>{S(a.collection_id),l.setQueryData(["collection",c],a),N("Collection created successfully")},onError:a=>{N("Collection creation failed due to "+a.message)}}),{mutate:z}=w(a=>f(`${g}/${c}`,{method:"PATCH",body:JSON.stringify(a)}),{onSuccess:a=>{S(a.collection_id),l.setQueryData(["collection",c],a),N("Collection updated successfully")},onError:a=>{N("Collection could not be updated due to "+a.message)}}),{mutate:A}=w(a=>f(`${g}/${c}/products`,{method:"POST",body:JSON.stringify(a)}),{onSuccess:a=>{l.invalidateQueries(["collection-products",b])},onError:a=>{}}),{mutate:H}=w(a=>f(`${g}/${c}/products/${a}`,{method:"DELETE"}),{onSuccess:()=>{l.invalidateQueries(["collection-products",b])},onError:a=>{}}),J=a=>({limit:15,term:a,shop_id:i==null?void 0:i.shop_id,type:"product"}),V=a=>{D(()=>[...a]);const d=T.map((x,p)=>({shop_id:i==null?void 0:i.shop_id,collection_id:c,product_id:x[C],active:!0,position:p}));A(d)},K=a=>{const d=a.successful[0].uploadURL;U(d)},y=ie.useMemo(()=>new de({id:"collection",autoProceed:!1,restrictions:{maxFileSize:15*1024*1024,maxNumberOfFiles:1,minNumberOfFiles:1,allowedFileTypes:["image/*","video/*"]}}).use(ce,{target:document.body}).on("complete",K).use(ne,{endpoint:"https://storage.reoplex.com/files/"}),[]),X=a=>{a.forEach(d=>{y.addFile({name:d.name,type:d.type,data:d.blob})}),Object.keys(y.state.files).forEach(d=>{y.setFileState(d,{progress:{uploadComplete:!0,uploadStarted:!0}})})};return u.exports.useEffect(()=>{var a,d,x,p;((a=s==null?void 0:s.image)==null?void 0:a.image_url)&&((d=s==null?void 0:s.image)==null?void 0:d.image_url)!==""&&((x=s==null?void 0:s.image)==null?void 0:x.image_url)!==void 0&&fetch((p=s==null?void 0:s.image)==null?void 0:p.image_url).then(h=>h.blob()).then(h=>{X([{name:s==null?void 0:s.handle,type:h.type,data:h}])})},[s]),u.exports.useEffect(()=>()=>y.close(),[]),e(re,{children:M?e(ue,{}):e("div",{children:e(oe,{initialValues:{title:(s==null?void 0:s.title)||"",description:(s==null?void 0:s.description)||"",type:"manual"},onSubmit:(a,{setSubmitting:d})=>{c||s?z(_(v(v({},s),a),{collection_id:c,shop_id:i==null?void 0:i.shop_id,image:{image_url:k}})):Q(_(v({},a),{collection_id:"",shop_id:i==null?void 0:i.shop_id,image:{image_url:k}})),d(!1)},children:({values:a,errors:d,touched:x,handleChange:p,handleBlur:h,setFieldValue:fe,setFieldError:be,setValues:ye,setFieldTouched:xe,handleSubmit:G,isSubmitting:ve})=>n("div",{className:"flex-grow w-full mx-auto",children:[e("div",{className:"grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-y-6 gap-x-6",children:n("div",{className:"sm:col-span-3 md:col-span-3 lg:col-span-2",children:[n("section",{className:"rounded bg-white shadow overflow-hidden p-3",children:[e("div",{className:"sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:n("div",{className:"w-full",children:[e("label",{className:"block text-sm font-medium mb-1",htmlFor:"title",children:"Title"}),e("input",{id:"title",name:"title",onChange:p,onBlur:h,value:a.title,className:"form-input w-full",type:"text",autoComplete:"collection-title",placeholder:"Shoes"})]})}),e("div",{className:"sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:e("div",{className:"w-full",children:e("label",{className:"block text-sm font-medium mb-1",htmlFor:"description",children:"Description"})})}),e("div",{className:"sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:n("div",{className:"w-full",children:[e("label",{className:"block text-sm font-medium mb-1",htmlFor:"type",children:"Type"}),n("select",{name:"type",onChange:p,onBlur:h,value:a.type,id:"type",className:"form-select block",children:[e("option",{value:"",children:"Please Select"}),e("option",{value:"automatic",children:"Automatic"}),e("option",{value:"manual",children:"Manual"})]})]})})]}),n("section",{className:"rounded bg-white shadow overflow-hidden p-3 mb-10",children:[e("h2",{className:"text-sm header leading-snug text-gray-800 font-bold mb-1",children:"Collection Image"}),e("div",{className:"sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5",children:e("div",{className:"w-full",children:e(me,{uppy:y,proudlyDisplayPoweredByUppy:!1,showProgressDetails:!0,width:"100%",height:"400px",theme:"light",note:"Images and video only, 2-6 files, up to 1 MB",metaFields:[{id:"alt",name:"Alt",placeholder:"describe what the image is about"}]})})})]}),c&&n("section",{className:"rounded bg-white shadow overflow-hidden p-3 mb-10",children:["Products",e("div",{children:e("div",{className:"w-full",children:e("div",{className:"w-full",children:e("div",{className:"flex border-1 rounded",children:e(he,{id:"quick-find-modal-products-collection-frm",searchId:"quick-find-modal-products-collection-frm",modalOpen:L,setModalOpen:B,queryURL:`${R}/shops/${i==null?void 0:i.shop_id}/products/option-search`,composeQuery:J,queryKey:"products-opt-search",matchKey:C,handleResultSelected:V,alreadySelected:t==null?void 0:t.products.map(m=>m.product_id)})})})})}),(t==null?void 0:t.products)&&e("div",{children:t==null?void 0:t.products.map(m=>n("div",{className:"flex items-center",children:[e("div",{className:"flex-shrink-0 h-10 w-10",children:e("img",{className:"h-10 w-10",src:m.image_url,alt:m.title})}),n("div",{className:"ml-4 flex justify-between",children:[e("div",{className:"text-sm font-medium text-gray-900",children:m.title}),e("div",{onClick:W=>{W.stopPropagation(),H(m.product_id)},className:"text-sm text-gray-500 cursor-pointer",children:"X"})]})]},m.product_id))}),(t==null?void 0:t.products)&&t.next_page_token&&e("div",{children:e(ge,{previous:{disabled:$==="",callBack:F($)},next:{disabled:(t==null?void 0:t.next_page_token)===""||(t==null?void 0:t.next_page_token)===void 0,callBack:()=>{q(b),F(t==null?void 0:t.next_page_token)}}})})]})]})}),e("footer",{className:"sticky bottom-0",children:e("div",{className:"flex flex-col py-5 border-t border-gray-200",children:n("div",{className:"flex self-end",children:[e("button",{className:"btn border-gray-200 hover:border-gray-300 text-gray-600",children:"Cancel"}),e("button",{onClick:m=>G(),className:"btn bg-blue-600 bg-opacity-100 rounded-lg  text-white ml-3",children:"Save Changes"})]})})})]})})})})}export{Pe as default};
