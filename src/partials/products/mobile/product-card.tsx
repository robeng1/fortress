import useClipboard from "hooks/use-clipboard"
import useShop from "hooks/use-shop"
import * as React from "react"
import { IoIosCopy, IoMdCopy } from "react-icons/io"
import { ProductViewType } from "typings/product/product-type"
import { formatPesosMoney } from "utils/money"
import { proxyURL } from "utils/urlsigner"

type ProductCardProps = {
  product: ProductViewType
  handleClick?: (e: any) => void
  isChecked?: boolean
  handleShow: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, handleShow }) => {
  const { shop } = useShop()
  const [isCopied, handleCopy] = useClipboard(
    `https://${shop?.permanent_domain}/products/${product.handle}`
  )
  const statusColor = (stock) => {
    if (stock > 0) {
      return "bg-green-100 text-green-600"
    }
    return "bg-red-100 text-red-600"
  }
  const { image_url, title } = product
  return (
    <>
      <div onClick={() => handleShow()} className="flex-shrink-0 w-[48px] h-[48px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden">
        <img
          src={proxyURL(image_url, 50, 50)}
          alt={title || ""}
          
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="ml-2 cursor-pointer flex-1 flex flex-col pl-2">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <div onClick={() => handleShow()}>
              <div className="flex">
                {title}
              </div>
            </div>
            {!!shop && (
              <span className="ml-2">
                <svg className="text-gray-500 w-5 h-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" onClick={handleCopy} data-name="Layer 1" viewBox="0 0 24 24"><path d="M21.707,11.293l-8-8A.99991.99991,0,0,0,12,4V7.54492A11.01525,11.01525,0,0,0,2,18.5V20a1,1,0,0,0,1.78418.62061,11.45625,11.45625,0,0,1,7.88672-4.04932c.0498-.00635.1748-.01611.3291-.02588V20a.99991.99991,0,0,0,1.707.707l8-8A.99962.99962,0,0,0,21.707,11.293ZM14,17.58594V15.5a.99974.99974,0,0,0-1-1c-.25488,0-1.2959.04932-1.56152.085A14.00507,14.00507,0,0,0,4.05176,17.5332,9.01266,9.01266,0,0,1,13,9.5a.99974.99974,0,0,0,1-1V6.41406L19.58594,12Z" /></svg>
              </span>
            )}
          </div>
        </div>
        <div onClick={() => handleShow()} className="flex justify-between text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded text-center py-0.5 px-2 ${statusColor(
              product.num_in_stock
            )}`}
          >
            {`${product.num_in_stock} in stock`}
          </p>
          <p className="ml-4 text-sm text-gray-500">
            {formatPesosMoney(product.price_int, product.currency)}
          </p>
        </div>
      </div>
    </>
  )
}

export default ProductCard
