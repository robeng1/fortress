import React from 'react';
import { Formik } from 'formik';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import ReactQuill from 'react-quill';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import './filepond.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function CollectionForm() {
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-6">
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
                          maxHeight: '14rem',
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
                    Collection image
                  </h2>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="w-full">
                      <FilePond
                        files={values.files}
                        onupdatefiles={fileItems => {
                          setFieldValue('files', [
                            ...values.files,
                            ...fileItems,
                          ]);
                        }}
                        credits={{}}
                        allowMultiple={true}
                        maxFiles={1}
                        server={null}
                        instantUpload={false}
                        id="files"
                        name="files"
                        key="files"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                      />
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
