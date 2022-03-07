import React, { useState } from 'react';
import { Formik } from 'formik';
import { useThemeMutation } from 'hooks/use-theme-mutation';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'components/common/backdrop';

function Footer() {
  const navigate = useNavigate();
  const { theme, config, updateTheme, isUpdatingTheme } = useThemeMutation();
  const initialValues =
    config && config.settings && config.settings.sections
      ? config.settings.sections['footer']
        ? config.settings.sections['footer']['settings'] ?? {}
        : {}
      : {};
  return (
    <div>
      <Loading open={isUpdatingTheme} />
      <Formik
        enableReinitialize
        initialValues={{
          social_instagram_visible: false,
          social_instagram_link: '',
          social_twitter_visible: false,
          social_twitter_link: '',
          social_facebook_visible: false,
          social_facebook_link: '',
          social_youtube_visible: false,
          social_youtube_link: '',
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
              footer: {
                ...cfg.settings['sections']['footer'],
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
          <div className="flex-grow bg-white">
            {/* Panel body */}
            <div className="md:p-6 p-4 space-y-6">
              <h2 className="text-2xl text-gray-800 font-bold mb-5">Footer</h2>
              <section>
                <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
                  Select which social icons to display
                </h3>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="flex items-center sm:w-1/2">
                    <input
                      className="form-checkbox"
                      id="social_instagram_visible"
                      name="social_instagram_visible"
                      type="checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.social_instagram_visible}
                    />
                    <label
                      className="block text-sm ml-2 "
                      htmlFor="social_instagram_visible"
                    >
                      Instagram
                    </label>
                  </div>
                  {values.social_instagram_visible && (
                    <div className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="social_instagram_link"
                        >
                          Handle
                        </label>
                        <input
                          id="social_instagram_link"
                          name="social_instagram_link"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.social_instagram_link}
                          className="form-input w-full"
                          type="text"
                          placeholder="kwesi_romeo"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="flex items-center sm:w-1/2">
                    <input
                      className="form-checkbox"
                      id="social_twitter_visible"
                      name="social_twitter_visible"
                      type="checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.social_twitter_visible}
                    />
                    <label
                      className="block text-sm ml-2 "
                      htmlFor="social_twitter_visible"
                    >
                      Twitter
                    </label>
                  </div>
                  {values.social_twitter_visible && (
                    <div className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="social_twitter_link"
                        >
                          Twitter handle without '@'
                        </label>
                        <input
                          id="social_twitter_link"
                          name="social_twitter_link"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.social_twitter_link}
                          className="form-input w-full"
                          type="text"
                          placeholder="thisisromeoo"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="flex items-center sm:w-1/2">
                    <input
                      className="form-checkbox"
                      id="social_facebook_visible"
                      name="social_facebook_visible"
                      type="checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.social_facebook_visible}
                    />
                    <label
                      className="block text-sm ml-2 "
                      htmlFor="social_facebook_visible"
                    >
                      Facebook
                    </label>
                  </div>
                  {values.social_facebook_visible && (
                    <div className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="social_facebook_link"
                        >
                          Facebook link
                        </label>
                        <input
                          id="social_facebook_link"
                          name="social_facebook_link"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.social_facebook_link}
                          className="form-input w-full"
                          type="text"
                          placeholder="thisisromeoo"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="flex items-center sm:w-1/2">
                    <input
                      className="form-checkbox"
                      id="social_youtube_visible"
                      name="social_youtube_visible"
                      type="checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.social_youtube_visible}
                    />
                    <label
                      className="block text-sm ml-2 "
                      htmlFor="social_youtube_visible"
                    >
                      Youtube
                    </label>
                  </div>
                  {values.social_youtube_visible && (
                    <div className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="social_youtube_link"
                        >
                          Youtube link
                        </label>
                        <input
                          id="social_youtube_link"
                          name="social_youtube_link"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.social_youtube_link}
                          className="form-input w-full"
                          type="text"
                          placeholder="thisisromeoo"
                        />
                      </div>
                    </div>
                  )}
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

export default Footer;
