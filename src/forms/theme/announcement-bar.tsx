import React, { useState } from "react"
import { Formik } from "formik"
import { Buffer } from "buffer"
import { useThemeMutation } from "hooks/use-theme-mutation"
import { useNavigate } from "react-router-dom"
import { Loading } from "components/blocks/backdrop"

function AnnouncementBar() {
  const navigate = useNavigate()
  const { theme, config, update, isUpdatingTheme, isLoadingTheme } =
    useThemeMutation()
  const initialValues =
    config &&
    config.settings &&
    (config?.settings as Record<string, any>).sections
      ? (config?.settings as Record<string, any>).sections[
          "layout-announcement-bar"
        ]
        ? (config?.settings as Record<string, any>).sections[
            "layout-announcement-bar"
          ]["settings"] ?? {}
        : {}
      : {}
  return (
    <div>
      <Loading open={isUpdatingTheme || isLoadingTheme} />
      <Formik
        enableReinitialize
        initialValues={{
          visible: false,
          home_page_only: true,
          content: "",
          ...initialValues,
        }}
        onSubmit={(values, { setSubmitting }) => {
          const vals = { ...values }
          let cfg = config
          if (!cfg) cfg = {}
          if (!cfg.settings) cfg.settings = {}
          cfg.settings = {
            ...(cfg?.settings as Record<string, any>),
            sections: {
              ...cfg.settings["sections"],
              "layout-announcement-bar": {
                ...cfg.settings["sections"]["layout-announcement-bar"],
                settings: { ...vals },
              },
            },
          }
          update({
            ...theme,
            config: {
              ...cfg,
              settings: cfg.settings,
            },
          })
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
          <div className="flex-grow bg-white">
            {/* Panel body */}
            <div className="md:p-6 p-4 space-y-6">
              <h2 className="text-2xl text-gray-800 font-bold mb-5">
                Announcement bar
              </h2>
              <section>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="content"
                    >
                      Content
                    </label>
                    <input
                      id="content"
                      name="content"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.content}
                      className="form-input w-full"
                      type="text"
                      placeholder="Free shipping on orders above $50"
                      required
                    />
                  </div>
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="flex items-center sm:w-1/2">
                    <input
                      className="form-checkbox"
                      id="visible"
                      name="visible"
                      type="checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.visible}
                    />
                    <label className="block text-sm ml-2 " htmlFor="visible">
                      Show Announcement bar
                    </label>
                  </div>
                  <div className="flex items-center sm:w-1/2">
                    <input
                      className="form-checkbox"
                      id="home_page_only"
                      name="home_page_only"
                      type="checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.home_page_only}
                    />
                    <label
                      className="block text-sm ml-2"
                      htmlFor="home_page_only"
                    >
                      Show only on home page
                    </label>
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
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSubmit()
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
  )
}

export default AnnouncementBar
