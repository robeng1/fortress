import useClipboard from "hooks/use-clipboard"
import useShop from "hooks/use-shop"
import useToaster from "hooks/use-toaster"
import React from "react"
import { IoIosCopy } from "react-icons/io"
import { ProductViewType } from "typings/product/product-type"
import { proxyURL } from "utils/urlsigner"

type ProductTableItemProps = {
  selectedItems: (items: string[]) => void
  handleShow: () => void
  handleClick: (e: any) => void
  isChecked: boolean
  product: ProductViewType
}

const ProductTableItem: React.FC<ProductTableItemProps> = ({
  product,
  selectedItems,
  handleShow,
  handleClick,
  isChecked,
}) => {
  const { shop } = useShop()
  const [isCopied, handleCopy] = useClipboard(
    `https://${shop?.permanent_domain}/products/${product.handle}`
  )

  const statusColor = (status) => {
    switch (status) {
      case "Not tracked":
        return "bg-green-100 text-green-600"
      case "0 in stock":
        return "bg-red-100 text-red-600"
      default:
        return "bg-green-100 text-green-600"
    }
  }
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              id={product.product_id}
              className="form-checkbox"
              type="checkbox"
              onChange={handleClick}
              checked={isChecked}
            />
          </label>
        </div>
      </td>
      <td className="cursor-pointer px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 flex-shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded"
              src={proxyURL(product.image_url, 50, 50)}
              alt={product.title}
            />
          </div>
          <div className="flex font-medium text-gray-800">
            <p onClick={handleShow} className="hover:underline">
              {product.title}
            </p>
            {!!shop && (
              <span className="ml-2">
                <svg className="text-gray-500 w-5 h-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" onClick={handleCopy} data-name="Layer 1" viewBox="0 0 24 24"><path d="M21.707,11.293l-8-8A.99991.99991,0,0,0,12,4V7.54492A11.01525,11.01525,0,0,0,2,18.5V20a1,1,0,0,0,1.78418.62061,11.45625,11.45625,0,0,1,7.88672-4.04932c.0498-.00635.1748-.01611.3291-.02588V20a.99991.99991,0,0,0,1.707.707l8-8A.99962.99962,0,0,0,21.707,11.293ZM14,17.58594V15.5a.99974.99974,0,0,0-1-1c-.25488,0-1.2959.04932-1.56152.085A14.00507,14.00507,0,0,0,4.05176,17.5332,9.01266,9.01266,0,0,1,13,9.5a.99974.99974,0,0,0,1-1V6.41406L19.58594,12Z" /></svg>
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div
          className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
            `${product.num_in_stock} in stock`
          )}`}
        >
          {product.num_in_stock} in stock
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="text-left">{product.categories[0]}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="text-left">{product.product_status || "Available"}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="text-center">{product.num_variants}</div>
      </td>
    </tr>
  )
}

export default ProductTableItem
