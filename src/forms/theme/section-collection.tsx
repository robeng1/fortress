import React, { useState } from 'react';
import { Loading } from 'components/blocks/backdrop';
import { Formik } from 'formik';
import { useThemeMutation } from 'hooks/use-theme-mutation';
import { useNavigate } from 'react-router-dom';
import { collectionOptions } from 'services/options-loaders';
import useShop from 'hooks/use-shop';
import AsyncCreatableSelect from 'react-select/async-creatable';
import customSelectStyles from 'forms/product/styles';

function SectionCollection() {
  const navigate = useNavigate();
  const { shop } = useShop();
  const { theme, updateTheme, isUpdatingTheme } = useThemeMutation();
  const ind = theme?.templates?.findIndex(t => t.type === 'index');
  const tpl = theme?.templates && ind ? theme?.templates[ind] : {};
  const cob = JSON.parse(tpl?.content ?? '{}');
  const initialValues =
    cob && cob.sections && cob.sections.featured_collection
      ? cob.sections.featured_collection.settings
      : {};
  initialValues.collection_featured = {
    key: initialValues.collection_featured,
    label: initialValues.collection_featured,
  };
  return (
    <div>
      <Loading open={isUpdatingTheme} />
      <Formik
        enableReinitialize
        initialValues={{
          headline: 'Selected products',
          collection_featured: { key: 'all', label: 'All' },
          collection_products_limit: 4,
          ...initialValues,
        }}
        onSubmit={(values, { setSubmitting }) => {
          const vals = { ...values };
          let content = cob;
          if (!content) content = {};
          if (!content.sections) content.sections = {};
          content.sections = {
            ...content?.sections,
            featured_collection: {
              ...content.sections.featured_collection,
              settings: { ...vals },
            },
          };
          const modfTemp = tpl;
          modfTemp.content = JSON.stringify(content);
          const modfTheme = theme;
          modfTheme!.templates![ind!] = modfTemp;
          updateTheme(modfTheme!);
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          /* and other goodies */
        }) => (
          <div className="flex-grow bg-white">
            {/* Panel body */}
            <div className="md:p-6 p-4 space-y-6">
              <h2 className="text-2xl text-gray-800 font-bold mb-5">
                Collection section
              </h2>
              <section>
                <div className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="headline"
                    >
                      Headline
                    </label>
                    <input
                      id="headline"
                      name="headline"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.headline}
                      className="form-input w-full"
                      type="text"
                      placeholder="Selected products"
                      required
                    />
                  </div>
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="collection_featured"
                    >
                      Featured collection
                    </label>
                    <AsyncCreatableSelect
                      value={values.collection_featured}
                      menuPortalTarget={document.body}
                      cacheOptions
                      closeMenuOnSelect={false}
                      onChange={option =>
                        setFieldValue('collection_featured', option)
                      }
                      placeholder="Select collection"
                      loadOptions={collectionOptions(shop?.shop_id || '')}
                      styles={{
                        ...customSelectStyles,
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="md:w-4/5">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="collection_products_limit"
                    >
                      Max. products to display
                    </label>
                    <select
                      id="collection_products_limit"
                      name="collection_products_limit"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.collection_products_limit}
                      className="form-select w-full"
                      placeholder="4"
                    >
                      <option value="">Please select</option>
                      <option value={4}>4</option>
                      <option value={8}>8</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
            <footer>
              <div className="flex flex-col px-6 py-5 md:border-t md:border-gray-200">
                <div className="flex self-end">
                  <button
                    onClick={() => navigate(-1)}
                    className="btn border-teal-600 hover:border-gray-700 text-gray-600 bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleSubmit();
                    }}
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
  );
}

export default SectionCollection;
