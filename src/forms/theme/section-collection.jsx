import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Formik } from 'formik';
import { useThemeMutation } from 'hooks/use-theme-mutation';
import { useNavigate } from 'react-router-dom';
import { collectionOptions } from 'services/options-loaders';
import { ReactSelect } from 'components/react-select';
import useShop from 'hooks/use-shop';

function SectionCollection() {
  const navigate = useNavigate();
  const { shop } = useShop();
  const { theme, config, updateTheme, isUpdatingTheme } = useThemeMutation();

  const initialValues =
    config && config.settings && config.settings.sections
      ? config.settings.sections['section-collection']
        ? config.settings.sections['section-collection']['settings'] ?? {}
        : {}
      : {};

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isUpdatingTheme}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Formik
        enableReinitialize
        initialValues={{
          headline: 'Selected products',
          collection_featured: 'all',
          collection_products_limit: 4,
          ...initialValues,
        }}
        onSubmit={(values, { setSubmitting }) => {
          const vals = { ...values };
          let cfg = config;
          if (!cfg) cfg = {};
          if (!cfg.settings) cfg.settings = {};
          cfg.settings = {
            ...cfg?.settings,
            sections: {
              ...cfg.settings['sections'],
              'section-collection': {
                ...cfg.settings['sections']['section-collection'],
                settings: { ...vals },
              },
            },
          };
          updateTheme({
            ...theme,
            config: { ...theme?.config, settings: { ...cfg } },
          });
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
          <div className="flex-grow">
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
                    <ReactSelect
                      value={values.collection_featured}
                      menuPortalTarget={document.body}
                      cacheOptions
                      closeMenuOnSelect={false}
                      onChange={option =>
                        setFieldValue('collection_featured', option)
                      }
                      placeholder="Select collection"
                      loadOptions={collectionOptions(shop?.shop_id)}
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
            <footer className="sticky bottom-0">
              <div className="flex flex-col px-6 py-5 md:border-t md:border-gray-200">
                <div className="flex self-end">
                  <button
                    onClick={() => navigate(-1)}
                    className="btn border-gray-200 hover:border-gray-300 text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleSubmit();
                    }}
                    className="btn bg-purple-600 bg-opacity-100 rounded-lg  text-white ml-3"
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