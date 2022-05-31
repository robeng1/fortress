import React, { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { Formik } from "formik"
import { fortressURL } from "endpoints/urls"
import { CollectionType, CollectType } from "typings/collection/collection-type"
import { request, ResponseError } from "utils/request"
import { ProductViewListType } from "typings/product/product-type"
import useShop from "hooks/use-shop"
import { useNavigate } from "react-router-dom"
import { Loading } from "components/blocks/backdrop"
import TextArea from "components/blocks/text-area"
import SimpleImageDropzone from "components/single-image-dropzone"
import { useUpload } from "hooks/use-upload"
import { proxyURL } from "utils/urlsigner"

export default function CollectionForm({ id }) {
  const matchKey = "key"
  const klient = useQueryClient()
  const navigate = useNavigate()
  const { shop } = useShop()
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/collections`
  const [collectionId, setCollectionId] = useState(id)
  const [selectedProducts, setSelectedProducts] = useState<any>([])

  // options search URLs
  const productOptionSearchURL = `${fortressURL}/shops/${shop?.shop_id}/products/option-search`
  const productQueryComposer = (term: string): Record<string, any> => {
    return { limit: 15, term, shop_id: shop?.shop_id, type: "product" }
  }

  // query for getting the collection
  const { data: collection, isLoading } = useQuery<CollectionType>(
    ["collection", collectionId],
    async () => await request(`${requestURL}/${collectionId}`),
    {
      // The query will not execute until the collectionId exists
      enabled: !!collectionId && shop?.shop_id !== undefined,
      keepPreviousData: true,
    }
  )

  // set the image if one already exists
  const [image, setImage] = useState(collection?.image)

  const { upload } = useUpload()

  const [isDirty, setIsDirty] = useState(false)

  const onImageChange = (files: File[]) => {
    if (files.length < 1) return
    const pickf = files[0]
    setImage(pickf["preview"] ?? "")
    setIsDirty(true)
    upload(files).then((bundle) => {
      // const statuses = bundle.transloadit; // Array of Assembly statuses
      const assemblyResults = bundle.results
      if (assemblyResults) {
        const url = assemblyResults[0].ssl_url
        setImage(url)
        setIsDirty(false)
      }
      return
    })
  }

  const [page, setPage] = useState<String>("")
  const [previousPage, setPreviousPage] = useState<String>("")
  const itemsPerPage = 20

  // retrieves a colletion's products to be displayed
  const { data: collectionProducts } = useQuery<ProductViewListType>(
    ["collection-products", page],
    async () => {
      try {
        const cols = await request(
          `${requestURL}/${collectionId}/products?page=${page}&num=${itemsPerPage}`
        )
        return cols
      } catch (error) {
        // TODO: do nothing
      }
    },
    {
      keepPreviousData: true,
      enabled: !!collectionId && shop?.shop_id !== undefined && false,
    }
  )

  // create the colletion
  const { mutate: createCollection, isLoading: isCreatingCollection } =
    useMutation(
      (payload: CollectionType) =>
        request(requestURL, {
          method: "POST",
          body: JSON.stringify(payload),
        }),
      {
        onSuccess: (newCollection: CollectionType) => {
          setCollectionId(newCollection.collection_id)
          klient.setQueryData(["collection", collectionId], newCollection)
          toast.success("Collection created successfully")
        },
        onError: (e: ResponseError) => {
          toast.error("Collection creation failed due to " + e.message)
        },
      }
    )

  // update the collection
  const { mutate: updateCollection, isLoading: isUpdatingCollection } =
    useMutation(
      (payload: CollectionType) =>
        request(`${requestURL}/${collectionId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        }),
      {
        onSuccess: (newCollection: CollectionType) => {
          setCollectionId(newCollection.collection_id)
          klient.setQueryData(["collection", collectionId], newCollection)
          toast.success("Collection updated successfully")
        },
        onError: (e: ResponseError) => {
          toast.error("Collection could not be updated due to " + e.message)
        },
      }
    )

  // add a product to the collection
  const { mutate: addProductToCollection } = useMutation(
    (payload: CollectType) =>
      request(`${requestURL}/${collectionId}/products`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newCollect: CollectType) => {
        klient.invalidateQueries(["collection-products", page])
      },
      onError: (e: ResponseError) => {},
    }
  )

  // add products to the collection
  // TODO: provide an endpoint for this
  const { mutate: addProductsToCollection } = useMutation(
    (payload: CollectType[]) =>
      request(`${requestURL}/${collectionId}/products`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newCollect: CollectType) => {
        klient.invalidateQueries(["collection-products", page])
      },
      onError: (e: ResponseError) => {},
    }
  )

  // remove a product to the collection
  const { mutate: removeProductFromCollection } = useMutation(
    (productId: string) =>
      request(`${requestURL}/${collectionId}/products/${productId}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => {
        klient.invalidateQueries(["collection-products", page])
      },
      onError: (e: ResponseError) => {},
    }
  )

  const handleSelectedItems = (selectedItems: any[]) => {
    setSelectedProducts(() => [...selectedItems])
    const collects: CollectType[] = selectedProducts.map(
      (item: any, index: number) => {
        return {
          shop_id: shop?.shop_id,
          collection_id: collectionId,
          product_id: item[matchKey],
          active: true,
          position: index,
        }
      }
    )
    addProductsToCollection(collects)
  }
  useEffect(() => {
    setImage(collection?.image)
  }, [collection])

  return (
    <>
      <div>
        <Loading
          open={isCreatingCollection || isUpdatingCollection || isDirty}
        />
        <Formik
          enableReinitialize
          initialValues={{
            title: collection?.title || "",
            description: collection?.description || "",
            type: "manual",
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (collectionId || collection) {
              updateCollection({
                ...collection,
                ...values,
                collection_id: collectionId,
                shop_id: shop?.shop_id,
                image: image,
              })
            } else {
              createCollection({
                ...values,
                collection_id: "",
                shop_id: shop?.shop_id,
                image: image,
              })
            }
            setSubmitting(false)
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            /* and other goodies */
          }) => (
            <div className="flex-grow w-full mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-6">
                <div className="col-span-1 md:col-span-2">
                  <section className="rounded bg-white shadow overflow-hidden p-3">
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="title"
                        >
                          Title
                        </label>
                        <input
                          id="title"
                          name="title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                          className="form-input w-full"
                          type="text"
                          autoComplete="collection-title"
                          placeholder="Shoes"
                        />
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="description"
                        >
                          Description
                        </label>

                        <TextArea
                          name="description"
                          id="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="type"
                        >
                          Type
                        </label>
                        <select
                          name="type"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.type}
                          id="type"
                          className="form-select block"
                        >
                          <option value="">Please Select</option>
                          <option value="automatic">Automatic</option>
                          <option value="manual">Manual</option>
                        </select>
                      </div>
                    </div>
                  </section>
                  {/* <SelectableResultSearchModal
                    id="quick-find-modald-br"
                    searchId="quick-findd-br"
                    modalOpen={isOpen}
                    setModalOpen={state => {
                      state === false ? handleClose() : handleOpen();
                    }}
                    queryURL={productOptionSearchURL}
                    composeQuery={productQueryComposer}
                    matchKey={matchKey}
                    queryKey="products-y-opt-search"
                    handleResultSelected={handleSelectedItems}
                    placeholder="products"
                    alreadySelected={collectionProducts?.products.map(
                      p => p.product_id,
                    )}
                    queryEnabled={!!shop?.shop_id}
                  /> */}
                  <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <SimpleImageDropzone
                        onChange={onImageChange}
                        label={"Collection Banner"}
                        value={image ? proxyURL(image, 255, 255) : undefined}
                        height={255}
                        width={255}
                      />
                    </div>
                  </section>
                </div>
              </div>
              <footer>
                <div className="flex flex-col py-5">
                  <div className="flex self-end">
                    <button
                      onClick={() => navigate("/collections")}
                      className="btn border-teal-600 hover:border-gray-700 text-gray-600 bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => handleSubmit()}
                      className="btn bg-purple-600 bg-opacity-100 rounded  text-white ml-3"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </footer>
            </div>
          )}
        </Formik>
      </div>
    </>
  )
}
