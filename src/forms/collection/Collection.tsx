import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Formik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Uppy from '@uppy/core';
import Transloadit from '@uppy/transloadit';
import { Dashboard } from '@uppy/react';

import '@uppy/status-bar/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DropTarget from '@uppy/drop-target';
import { fortressURL } from 'endpoints/urls';
import PaginationClassic from 'components/PaginationClassic';
import { CollectionType, CollectType } from 'models/collection/collection-type';
import { request, ResponseError } from 'utils/request';
import SelectableResultSearchModal from 'components/common/modal-searcher';
import { ProductViewListType } from 'models/product/product-type';
import useShop from 'hooks/use-shop';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'components/common/backdrop';
import TextArea from 'components/common/text-area';

export default function CollectionForm({ id }) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { shop } = useShop();
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
    async () => {
      try {
        const cols = await request(
          `${requestURL}/${collectionId}/products?page=${page}&num=${itemsPerPage}`,
        );
        return cols;
      } catch (error) {
        // TODO: do nothing
      }
    },
    { keepPreviousData: true, enabled: !!collectionId },
  );

  // create the colletion
  const { mutate: createCollection, isLoading: isCreatingCollection } =
    useMutation(
      (payload: CollectionType) =>
        request(requestURL, {
          method: 'POST',
          body: JSON.stringify(payload),
        }),
      {
        onSuccess: (newCollection: CollectionType) => {
          setCollectionId(newCollection.collection_id);
          qc.setQueryData(['collection', collectionId], newCollection);
          toast('Collection created successfully');
        },
        onError: (e: ResponseError) => {
          toast('Collection creation failed due to ' + e.message);
        },
      },
    );

  // update the collection
  const { mutate: updateCollection, isLoading: isUpdatingCollection } =
    useMutation(
      (payload: CollectionType) =>
        request(`${requestURL}/${collectionId}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        }),
      {
        onSuccess: (newCollection: CollectionType) => {
          setCollectionId(newCollection.collection_id);
          qc.setQueryData(['collection', collectionId], newCollection);
          toast('Collection updated successfully');
        },
        onError: (e: ResponseError) => {
          toast('Collection could not be updated due to ' + e.message);
        },
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
        qc.invalidateQueries(['collection-products', page]);
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
        qc.invalidateQueries(['collection-products', page]);
      },
      onError: (e: ResponseError) => {},
    },
  );
  const compose = (term: string): Record<string, any> => {
    return { limit: 15, term, shop_id: shop?.shop_id, type: 'product' };
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
      onBeforeUpload: files => {
        const updatedFiles = {};
        Object.keys(files).forEach(fileId => {
          updatedFiles[fileId] = {
            ...files[fileId],
            name: `reoplex_${shop?.shop_id || 'shop_demo'}_c_${
              files[fileId].name
            }`,
          };
        });
        return updatedFiles;
      },
    })
      .use(DropTarget, { target: document.body })
      .use(Transloadit, {
        service: 'https://api2.transloadit.com',
        params: {
          auth: {
            key: 'd6650968a1064588ae29f3d0f6a70ef5',
          },
          template_id: '24f76f542f784c4cba84bf1e347a84fb',
        },

        waitForEncoding: true,
        waitForMetadata: true,
        alwaysRunAssembly: true,
      })
      .on('file-removed', (file, reason) => {
        if (reason === 'removed-by-user') {
          // remove file from s3
          // sendDeleteRequestForFile(file);
        }
      })
      .on('transloadit:complete', assembly => {
        setImage(assembly.results[':original'][0].ssl_url);
      });
  }, []);

  const addFiles = files => {
    files.forEach(e => {
      uppy.addFile({
        name: e.name,
        type: e.type,
        data: e.blob, // changed blob -> data
      });
    });

    uppy.getFiles().forEach(file => {
      // https://uppy.io/docs/uppy/#uppy-setFileState-fileID-state
      uppy.setFileState(file.id, {
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
      <div>
        <Loading open={isCreatingCollection || isUpdatingCollection} />
        <Formik
          enableReinitialize
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
                          name="descrition"
                          id="description"
                          value={values.description}
                          onChange={handleChange}
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
                    <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                      Collection Image
                    </h2>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <Dashboard
                          uppy={uppy}
                          proudlyDisplayPoweredByUppy={false}
                          showProgressDetails={true}
                          width="100%"
                          height={'300px'}
                          theme="light"
                          note="Images only, 1 file"
                          doneButtonHandler={() => ({})}
                          hideProgressAfterFinish={true}
                          showRemoveButtonAfterComplete={true}
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
                                composeQuery={compose}
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
                                  collectionProducts?.next_page_token === '' ||
                                  collectionProducts?.next_page_token ===
                                    undefined,
                                callBack: () => {
                                  setPreviousPage(page);
                                  setPage(collectionProducts?.next_page_token);
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
                <div className="flex flex-col py-5">
                  <div className="flex self-end">
                    <button
                      onClick={() => navigate(-1)}
                      className="btn border-teal-600 hover:border-gray-700 text-gray-600 bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={e => handleSubmit()}
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
  );
}
