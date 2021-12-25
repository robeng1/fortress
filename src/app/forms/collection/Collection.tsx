import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Formik } from 'formik';
import ReactQuill from 'react-quill';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { Dashboard } from '@uppy/react';

import '@uppy/status-bar/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import { Loader } from 'app/components/Loader';
import DropTarget from '@uppy/drop-target';
import { fortressURL } from 'app/endpoints/urls';
import PaginationClassic from 'app/components/PaginationClassic';
import {
  CollectionType,
  CollectType,
} from 'app/models/collection/collection-type';
import { request, ResponseError } from 'utils/request';
import { useAtom } from 'jotai';
import { shopAtom } from 'store/shop';
import SelectableResultSearchModal from 'app/components/common/modal-searcher';
import { ProductViewListType } from 'app/models/product/product-type';

export default function CollectionForm({ handleShow, id }) {
  const queryClient = useQueryClient();
  const [shop] = useAtom(shopAtom);
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/collections`;
  const [collectionId, setCollectionId] = useState(id);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const matchKey = 'key';

  // for controlling products browsing modal
  const [searchProductsOpen, setSearchProductsOpen] = useState(false);

  // query for getting the collection
  const { data: collection, isLoading } = useQuery<CollectionType>(
    ['collection', collectionId],
    async () => await request(`${requestURL}/${collectionId}`),
    {
      // The query will not execute until the collectionId exists
      enabled: !!collectionId,
      keepPreviousData: true,
    },
  );

  // set the image if one already exists
  const [image, setImage] = useState(collection?.image?.image_url);

  const [page, setPage] = useState<String>('');
  const [previousPage, setPreviousPage] = useState<String>('');
  const itemsPerPage = 20;

  // retrieves a colletion's products to be displayed
  const { data: collectionProducts } = useQuery<ProductViewListType>(
    ['collection-products', page],
    async () =>
      await request(
        `${requestURL}/${collectionId}/products?page=${page}&num=${itemsPerPage}`,
      ),
    { keepPreviousData: true, enabled: !!collectionId },
  );

  // create the colletion
  const { mutate: createCollection } = useMutation(
    (payload: CollectionType) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newCollection: CollectionType) => {
        setCollectionId(newCollection.collection_id);
        queryClient.setQueryData(['collection', collectionId], newCollection);
      },
      onError: (e: ResponseError) => {},
    },
  );

  // update the collection
  const { mutate: updateCollection } = useMutation(
    (payload: CollectionType) =>
      request(`${requestURL}/${collectionId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newCollection: CollectionType) => {
        setCollectionId(newCollection.collection_id);
        queryClient.setQueryData(['collection', collectionId], newCollection);
      },
      onError: (e: ResponseError) => {},
    },
  );

  // add a product to the collection
  // const { mutate: addProductToCollection } = useMutation(
  //   (payload: CollectType) =>
  //     request(`${requestURL}/${collectionId}/products`, {
  //       method: 'POST',
  //       body: JSON.stringify(payload),
  //     }),
  //   {
  //     onSuccess: (newCollect: CollectType) => {
  //       queryClient.invalidateQueries(['collection-products', page]);
  //     },
  //     onError: (e: ResponseError) => {},
  //   },
  // );

  // add products to the collection
  // TODO: provide an endpoint for this
  const { mutate: addProductsToCollection } = useMutation(
    (payload: CollectType[]) =>
      request(`${requestURL}/${collectionId}/products`, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newCollect: CollectType) => {
        queryClient.invalidateQueries(['collection-products', page]);
      },
      onError: (e: ResponseError) => {},
    },
  );

  // remove a product to the collection
  const { mutate: removeProductFromCollection } = useMutation(
    (productId: string) =>
      request(`${requestURL}/${collectionId}/products/${productId}`, {
        method: 'DELETE',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['collection-products', page]);
      },
      onError: (e: ResponseError) => {},
    },
  );

  // returns the query string for browsing products to be added to a collection
  const queryString = (value: string): string => {
    let query = `SELECT * FROM product WHERE shop_id = '${shop?.shop_id}' LIMIT 15`;
    if (value && value !== '') {
      query = `SELECT * FROM product WHERE shop_id = '${shop?.shop_id}' AND TEXT_MATCH(search_col, '${value}') LIMIT 15`;
    }
    return query;
  };

  const handleSelectedItems = (selectedItems: any[]) => {
    setSelectedProducts(() => [...selectedItems]);
    const collects: CollectType[] = selectedProducts.map(
      (item: any, index: number) => {
        return {
          shop_id: shop?.shop_id,
          collection_id: collectionId,
          product_id: item[matchKey],
          active: true,
          position: index,
        };
      },
    );
    addProductsToCollection(collects);
  };

  const onUploadComplete = result => {
    const url = result.successful[0].uploadURL;
    // const fileName = file.name;
    setImage(url);
    // const li = document.createElement('li');
    // const a = document.createElement('a');
    // a.href = url;
    // a.target = '_blank';
    // a.appendChild(document.createTextNode(fileName));
    // li.appendChild(a);

    // document.querySelector(elForUploadedFiles).appendChild(li);
  };

  const uppy = React.useMemo(() => {
    return new Uppy({
      id: 'collection',
      autoProceed: false,
      restrictions: {
        maxFileSize: 15 * 1024 * 1024,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*', 'video/*'],
      },
    })
      .use(DropTarget, { target: document.body })
      .on('complete', onUploadComplete)
      .use(Tus, { endpoint: 'https://storage.reoplex.com/files/' });
  }, []);

  const addFiles = files => {
    files.forEach(e => {
      uppy.addFile({
        name: e.name,
        type: e.type,
        data: e.blob, // changed blob -> data
      });
    });

    Object.keys(uppy.state.files).forEach(fileID => {
      // https://uppy.io/docs/uppy/#uppy-setFileState-fileID-state
      uppy.setFileState(fileID, {
        progress: { uploadComplete: true, uploadStarted: true },
      });
    });
  };

  useEffect(() => {
    // assuming the image lives on a server somewhere
    collection?.image?.image_url &&
      collection?.image?.image_url !== '' &&
      collection?.image?.image_url !== undefined &&
      fetch(collection?.image?.image_url)
        .then(response => response.blob()) // returns a Blob
        .then(blob => {
          addFiles([
            {
              name: collection?.handle,
              type: blob.type,
              data: blob, // changed blob -> data
            },
          ]);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  useEffect(() => {
    return () => uppy.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Formik
            initialValues={{
              title: collection?.title || '',
              description: collection?.description || '',
              type: 'manual',
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (collectionId || collection) {
                updateCollection({
                  ...collection,
                  ...values,
                  collection_id: collectionId,
                  shop_id: shop?.shop_id,
                  image: { image_url: image },
                });
              } else {
                createCollection({
                  ...values,
                  collection_id: '',
                  shop_id: shop?.shop_id,
                  image: { image_url: image },
                });
              }
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              setFieldError,
              setValues,
              setFieldTouched,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <div className="flex-grow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-y-6 gap-x-6">
                  <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
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
                          <ReactQuill
                            theme="snow"
                            id="description"
                            onChange={e => setFieldValue('description', e)}
                            value={values.description}
                            style={{
                              maxHeight: '15rem',
                            }}
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
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                      <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                        Collection Image
                      </h2>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <Dashboard
                            uppy={uppy}
                            proudlyDisplayPoweredByUppy={false}
                            showProgressDetails={true}
                            width="100%"
                            height="400px"
                            theme="light"
                            note="Images and video only, 2-6 files, up to 1 MB"
                            metaFields={[
                              {
                                id: 'alt',
                                name: 'Alt',
                                placeholder: 'describe what the image is about',
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </section>
                    {collectionId && (
                      <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                        Products
                        <div>
                          <div className="w-full">
                            <div className="w-full">
                              <div className="flex border-1 rounded">
                                <SelectableResultSearchModal
                                  id="quick-find-modal-products-collection-frm"
                                  searchId="quick-find-modal-products-collection-frm"
                                  modalOpen={searchProductsOpen}
                                  setModalOpen={setSearchProductsOpen}
                                  queryURL={`${fortressURL}/shops/${shop?.shop_id}/products/option-search`}
                                  buildQuery={queryString}
                                  queryKey="products-opt-search"
                                  matchKey={matchKey}
                                  handleResultSelected={handleSelectedItems}
                                  alreadySelected={collectionProducts?.products.map(
                                    p => p.product_id,
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {collectionProducts?.products && (
                          <div>
                            {collectionProducts?.products.map(product => (
                              <div
                                key={product.product_id}
                                className="flex items-center"
                              >
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10"
                                    src={product.image_url}
                                    alt={product.title}
                                  />
                                </div>
                                <div className="ml-4 flex justify-between">
                                  <div className="text-sm font-medium text-gray-900">
                                    {product.title}
                                  </div>
                                  <div
                                    onClick={e => {
                                      e.stopPropagation();
                                      removeProductFromCollection(
                                        product.product_id,
                                      );
                                    }}
                                    className="text-sm text-gray-500 cursor-pointer"
                                  >
                                    X
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {collectionProducts?.products &&
                          collectionProducts.next_page_token && (
                            <div>
                              <PaginationClassic
                                previous={{
                                  disabled: previousPage === '',
                                  callBack: setPage(previousPage),
                                }}
                                next={{
                                  disabled:
                                    collectionProducts?.next_page_token ===
                                      '' ||
                                    collectionProducts?.next_page_token ===
                                      undefined,
                                  callBack: () => {
                                    setPreviousPage(page);
                                    setPage(
                                      collectionProducts?.next_page_token,
                                    );
                                  },
                                }}
                              />
                            </div>
                          )}
                      </section>
                    )}
                  </div>
                </div>
                <footer>
                  <div className="flex flex-col px-6 py-5 border-t border-gray-200">
                    <div className="flex self-end md:self-center">
                      <button className="btn border-gray-200 hover:border-gray-300 text-gray-600">
                        Cancel
                      </button>
                      <button
                        onClick={e => handleSubmit()}
                        className="btn bg-blue-900 bg-opacity-100 rounded-lg  text-white ml-3"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </footer>
              </div>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}
