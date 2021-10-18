import React from 'react';
import { Formik } from 'formik';
import ReactQuill from 'react-quill';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { Dashboard } from '@uppy/react';
import Webcam from '@uppy/webcam';
import '@uppy/status-bar/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import GoogleDrive from '@uppy/google-drive';
import Dropbox from '@uppy/dropbox';
import Instagram from '@uppy/instagram';
import Facebook from '@uppy/facebook';
import OneDrive from '@uppy/onedrive';

const Box = require('@uppy/box');
const DropTarget = require('@uppy/drop-target');

export default function CollectionForm() {
  const uppy = React.useMemo(() => {
    return new Uppy({
      id: 'product',
      autoProceed: false,
      restrictions: {
        maxFileSize: 15 * 1024 * 1024,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*', 'video/*'],
      },
    })
      .use(Webcam) // `id` defaults to "Webcam". Note: no `target` option!
      .use(GoogleDrive, {
        companionUrl: 'https://companion.uppy.io',
      })
      .use(Dropbox, {
        companionUrl: 'https://companion.uppy.io',
      })
      .use(Box, {
        companionUrl: 'https://companion.uppy.io',
      })
      .use(Instagram, {
        companionUrl: 'https://companion.uppy.io',
      })
      .use(Facebook, {
        companionUrl: 'https://companion.uppy.io',
      })
      .use(OneDrive, {
        companionUrl: 'https://companion.uppy.io',
      })
      .use(DropTarget, { target: document.body })
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' });
  }, []);

  React.useEffect(() => {
    return () => uppy.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          description: '',
          type: 'manual',
          files: [],
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
                        name="description"
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
                        note="Images and video only, 2–6 files, up to 1 MB"
                        metaFields={[
                          {
                            id: 'alt',
                            name: 'Alt',
                            placeholder: 'describe what the image is about',
                          },
                        ]}
                        browserBackButtonClose={false}
                        plugins={[
                          'Webcam',
                          'Instagram',
                          'GoogleDrive',
                          'Dropbox',
                          'Box',
                          'ImageEditor',
                        ]}
                      />
                    </div>
                  </div>
                </section>
                <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                  Products
                  <div>
                    <div className="w-full">
                      <div className="w-full">
                        <div className="flex border-1 rounded">
                          <input
                            type="text"
                            className="form-input w-full"
                            placeholder="Search products..."
                          />
                          <button className="flex items-center justify-center px-4 border-l">
                            <svg
                              className="w-6 h-6 text-gray-600"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <footer>
              <div className="flex flex-col px-6 py-5 border-t border-gray-200">
                <div className="flex self-end md:self-center">
                  <button className="btn border-gray-200 hover:border-gray-300 text-gray-600">
                    Cancel
                  </button>
                  <button className="btn bg-blue-900 bg-opacity-100 rounded-lg  text-white ml-3">
                    Save Changes
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
