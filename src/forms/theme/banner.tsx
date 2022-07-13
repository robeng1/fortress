import React, { useEffect, useState } from "react"
import { Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { Loading } from "components/blocks/backdrop"
import SimpleImageDropzone from "components/single-image-dropzone"
import { useUpload } from "hooks/use-upload"
import toast from "react-hot-toast"
import { useShopAppMutation } from "hooks/use-shop-app-mutation"
import { PageTemplate } from "typings/theme/types"
import { BannerSettings } from "./types"

const emptyBanner: BannerSettings = {
  image_url: '', shop_id: '', type: 'medium', url: '/search', id: '1', title: 'Shop amazing products'
}

const emptyBanners: BannerSettings[] = [emptyBanner, emptyBanner]

function Banner() {
  const navigate = useNavigate()
  const { app, update, isUpdatingApp, isLoadingApp } = useShopAppMutation()
  const tpl: PageTemplate | undefined = app?.template
  const banners: BannerSettings[] =
    tpl && tpl.sections && tpl.sections["banner-slider-block"]
      ? (tpl.sections["banner-slider-block"].settings?.banners ? tpl.sections["banner-slider-block"].settings?.banners as BannerSettings[] : emptyBanners)
      : emptyBanners

  const initialValues: BannerSettings = banners && banners.length > 1 ? banners[1] : emptyBanner
  const [image, setImage] = useState(initialValues.image_url ?? "")
  const { upload } = useUpload()

  const [isDirty, setIsDirty] = useState(false)

  const onImageChange = (files: File[]) => {
    if (files.length < 1) return
    const pickf = files[0]
    setImage(pickf["preview"] ?? "")
    setIsDirty(true)
    upload(files).then((bundle) => {
      // const statuses = bundle.transloadit; // Array of Assembly statuses
      const assemblyResults = bundle.results
      if (assemblyResults) {
        const url = assemblyResults[0].ssl_url
        setImage(url)
        setIsDirty(false)
      }
      return
    })
  }
  useEffect(() => {
    setImage(initialValues.image_url ?? "")
  }, [app])

  useEffect(() => {
    if (isUpdatingApp) {
      toast.loading("Updating theme", { id: "saving-hero" })
    } else {
      toast.dismiss("saving-hero")
    }
  }, [isUpdatingApp])

  return (
    <div>
      <Loading open={isUpdatingApp || isDirty || isLoadingApp} />
      <Formik
        enableReinitialize
        initialValues={{
          ...initialValues,
        }}
        onSubmit={(values, { setSubmitting }) => {
          const vals = { ...values }
          let content = tpl
          banners[1] = { ...vals, image_url: image }
          if (!content) content = { sections: {}, order: [] }
          if (!content.sections) content.sections = {}
          content.sections = {
            ...content?.sections,
            "banner-slider-block": {
              ...content.sections["banner-slider-block"],
              settings: { banners },
            },
          }
          const modfApp = app
          modfApp!.template = content
          update(modfApp!)
          setSubmitting(false)
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
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <SimpleImageDropzone
                      onChange={onImageChange}
                      label={"Banner"}
                      value={image}
                      height="50%"
                      width="100%"
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
                      id="title"
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      className="form-input w-full"
                      type="text"
                      placeholder="Summer shoes"
                      required
                    />
                  </div>
                </div>
              </section>
              <section>
                <h5>URL</h5>
                <div className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="url"
                    >
                      URL
                    </label>
                    <input
                      id="url"
                      name="url"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values["url"]}
                      className="form-input w-full"
                      type="text"
                      placeholder="/search"
                      required
                    />
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

export default Banner
