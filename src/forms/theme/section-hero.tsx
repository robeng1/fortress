import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Formik } from 'formik';
import { useThemeMutation } from 'hooks/use-theme-mutation';
import { useNavigate } from 'react-router-dom';
import Uppy from '@uppy/core';
import Transloadit from '@uppy/transloadit';
import { Dashboard } from '@uppy/react';
import DropTarget from '@uppy/drop-target';

import '@uppy/status-bar/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import useShop from 'hooks/use-shop';

function Hero() {
  const navigate = useNavigate();
  const { shop } = useShop();
  const { theme, config, updateTheme, isUpdatingTheme } = useThemeMutation();
  const initialValues =
    config && config.settings && config.settings.sections
      ? config.settings.sections['section-hero']
        ? config.settings.sections['section-hero']['settings'] ?? {}
        : {}
      : {};
  // set the image if one already exists
  const [image, setImage] = useState(initialValues['image'] ?? '');

  const uppy = React.useMemo(() => {
    return new Uppy({
      id: 'hero-image',
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
          image: '',
          headline: '',
          text: '',
          'button-url': '',
          'button-text': '',
          ...initialValues,
        }}
        onSubmit={(values, { setSubmitting }) => {
          const vals = { ...values, image: image };
          let cfg = config;
          if (!cfg) cfg = {};
          if (!cfg.settings) cfg.settings = {};
          cfg.settings = {
            ...cfg?.settings,
            sections: {
              ...cfg.settings['sections'],
              'section-hero': {
                ...cfg.settings['sections']['section-hero'],
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
              <h2 className="text-2xl text-gray-800 font-bold mb-5">Banner</h2>
              <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                  Banner Image
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
                      placeholder="Summer shoes"
                      required
                    />
                  </div>
                </div>
                <div className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="text"
                    >
                      Text
                    </label>
                    <input
                      id="text"
                      name="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.text}
                      className="form-input w-full"
                      type="textarea"
                      placeholder="Summer shoes with the best soles"
                      required
                    />
                  </div>
                </div>
              </section>
              <section>
                <h5>Button and URL</h5>
                <div className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="button-text"
                    >
                      Button Text
                    </label>
                    <input
                      id="button-text"
                      name="button-text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values['button-text']}
                      className="form-input w-full"
                      type="text"
                      placeholder="View all"
                      required
                    />
                  </div>
                </div>
                <div className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="button-url"
                    >
                      URL
                    </label>
                    <input
                      id="button-url"
                      name="button-url"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values['button-url']}
                      className="form-input w-full"
                      type="text"
                      placeholder="/collections/all"
                      required
                    />
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

export default Hero;
