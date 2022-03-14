import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { Box, Flex, Image } from 'rebass';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Formik } from 'formik';
import Uppy from '@uppy/core';
import Transloadit from '@uppy/transloadit';
import { Dashboard } from '@uppy/react';

import '@uppy/status-bar/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
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
import useModal from 'hooks/use-modal';
import FileUploadField from 'components/common/file-upload-field';

const Cross = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 5px;
  cursor: pointer;
`;


const ImageCardWrapper = styled(Box)`
  position: relative;
  display: inline-block;
  height: 200px;
  width: 200px;
  margin: 0px 16px 16px 0px;
`;

const StyledImageCard = styled(Box)`
  height: 200px;
  width: 200px;
  border: ${props => (props.selected ? '1px solid #53725D' : 'none')};
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.08) 0px 3px 9px 0px,
    rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
  border-radius: 3px;
`;

const StyledImageBox = styled(Flex)`
  flex-wrap: wrap;
  .img-container {
    border: 1px solid black;
    background-color: white;
    height: 50px;
    width: 50px;
    &:first-of-type {
      height: 230px;
      width: 100%;
      object-fit: contain;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

export default function CollectionForm({ id }) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { shop } = useShop();
  const { isOpen, handleClose, handleOpen } = useModal();
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/collections`;
  const [collectionId, setCollectionId] = useState(id);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
 const [images, setImages] = React.useState<any[]>([]);

 const appendImage = image => setImages([...images, image]);
 const removeImage = image => {
   const idx = images.findIndex(img => img.image === image.image);
   if (idx !== -1) {
     images.splice(idx, 1);
   }
   setImages([...images]);
 };
  const matchKey = 'key';

  const onImageChange = d => {
    console.log(d)
    setImages(images.concat(d));
  };

  const handleImageDelete = url => {
      setImages(images.filter(im => im !== url));
  };

  // options search URLs
  const productOptionSearchURL = `${fortressURL}/shops/${shop?.shop_id}/products/option-search`;
  const productQueryComposer = (term: string): Record<string, any> => {
    return { limit: 15, term, shop_id: shop?.shop_id, type: 'product' };
  };

  // query for getting the collection
  const { data: collection, isLoading } = useQuery<CollectionType>(
    ['collection', collectionId],
    async () => await request(`${requestURL}/${collectionId}`),
    {
      // The query will not execute until the collectionId exists
      enabled: !!collectionId && shop?.shop_id !== undefined,
      keepPreviousData: true,
    },
  );

  // set the image if one already exists
  const [image, setImage] = useState(collection?.image?.image_url);
  const [file, setFile] = useState<any>();

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
    {
      keepPreviousData: true,
      enabled: !!collectionId && shop?.shop_id !== undefined,
    },
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
  const { mutate: addProductToCollection } = useMutation(
    (payload: CollectType) =>
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

  const markFilesAsUploaded = () => {
    uppy.getFiles().forEach(file => {
      uppy.setFileState(file.id, {
        progress: {
          uploadComplete: true,
          uploadStarted: true,
          bytesUploaded: file.size,
        },
      });
    });
  };

  const processFiles = (collection?: CollectionType) => {
    if (!collection) return;
    const img = collection.image;
    const url = img?.image_url;
    if (!url || url === '') return;
    fetch(url)
      .then(response => response.blob()) // returns a Blob
      .then(blob => {
        uppy.addFile({
          name: collection?.handle ?? '',
          type: blob.type,
          data: blob, // changed blob -> data
          size: blob.size,
        });
        markFilesAsUploaded();
      });
  };

  useEffect(() => {
    processFiles(collection);
  }, [collection]);

  useEffect(() => {
    return () => uppy.close();
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
                  <SelectableResultSearchModal
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
                  />
                  <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                    <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                      Collection Image
                    </h2>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5"></div>
                    <Flex mb={4}>
                      <StyledImageBox>
                        {images.map((im, i) => (
                          <ImageCardWrapper key={i} mr={3}>
                            <StyledImageCard
                              key={i}
                              as="img"
                              src={im.url}
                              sx={{}}
                            />
                            <Cross onClick={() => handleImageDelete(im)}>
                              &#x2715;
                            </Cross>
                          </ImageCardWrapper>
                        ))}
                        {images.length < 1 && (
                          <ImageCardWrapper key={'up'} mr={3}>
                            <FileUploadField
                              className="py-24 w-full"
                              onFileChosen={files => {
                                const file = files[0];
                                const url = URL.createObjectURL(file);
                                appendImage({
                                  url,
                                  name: file.name,
                                  size: file.size,
                                  nativeFile: file,
                                });
                              }}
                              filetypes={['png', 'jpeg', 'jpg']}
                            />
                          </ImageCardWrapper>
                        )}
                      </StyledImageBox>
                    </Flex>
                  </section>
                  {collectionId && (
                    <section
                      onClick={handleOpen}
                      className="rounded cursor-pointer bg-white shadow overflow-hidden p-3 mb-10"
                    >
                      Products
                      {collectionProducts && collectionProducts?.products && (
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
                      {collectionProducts &&
                        collectionProducts?.products &&
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
