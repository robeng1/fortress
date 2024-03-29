import React, { useEffect, useState } from "react"
import { Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { Loading } from "components/blocks/backdrop"
import toast from "react-hot-toast"
import { useShopAppMutation } from "hooks/use-shop-app-mutation"

function Footer() {
  const navigate = useNavigate()
  const { app, update, isUpdatingApp, isLoadingApp } =
    useShopAppMutation()
  useEffect(() => {
    if (isUpdatingApp) {
      toast.loading("Updating theme", { id: "saving-footer" })
    } else {
      toast.dismiss("saving-footer")
    }
  }, [isUpdatingApp])
  return (
    <div>
      <Loading open={isUpdatingApp || isLoadingApp} />
      <Formik
        enableReinitialize
        initialValues={{
          social_instagram_visible: app?.instagram_link ? true : false,
          social_instagram_link: app?.instagram_link,
          social_twitter_visible: app?.twitter_link ? true : false,
          social_twitter_link: app?.twitter_link,
          social_facebook_visible: app?.facebook_link ? true : false,
          social_facebook_link: app?.facebook_link,
          social_youtube_visible: app?.youtube_link ? true : false,
          social_youtube_link: app?.youtube_link,
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (app) {
            update({
              ...app,
              instagram_link:
                values.social_instagram_link &&
                  values.social_instagram_link !== ""
                  ? values.social_instagram_link.startsWith(
                    `https://instagram.com/`
                  )
                    ? `${values.social_instagram_link}`
                    : `https://instagram.com/${values.social_instagram_link}`
                  : "",
              twitter_link:
                values.social_twitter_link &&
                  values.social_twitter_link !== ""
                  ? values.social_twitter_link.startsWith(
                    `https://twitter.com/`
                  )
                    ? `${values.social_twitter_link}`
                    : `https://twitter.com/${values.social_twitter_link}`
                  : "",

            })
          }
          setSubmitting(false)
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
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

export default Footer
