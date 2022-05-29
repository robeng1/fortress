import React, { useEffect, useState } from "react"
import { Formik } from "formik"
import { useThemeMutation } from "hooks/use-theme-mutation"
import { useNavigate } from "react-router-dom"
import { Loading } from "components/blocks/backdrop"
import { Template } from "typings/theme/template"
import SimpleImageDropzone from "components/single-image-dropzone"
import { useUpload } from "hooks/use-upload"
import toast from "react-hot-toast"

function Hero() {
  const navigate = useNavigate()
  const { theme, update, isUpdatingTheme, isLoadingTheme } = useThemeMutation()
  const ind = theme?.templates?.findIndex((t) => t.type === "index")
  const tpl: Template = theme?.templates && ind ? theme?.templates[ind] : {}
  const cob = JSON.parse(tpl?.content ?? "{}")
  const initialValues =
    cob && cob.sections && cob.sections["section-hero"]
      ? cob.sections["section-hero"].settings
      : {}
  const [image, setImage] = useState(initialValues["image"] ?? "")
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
    setImage(initialValues["image"])
  }, [theme])

  useEffect(() => {
    if (isUpdatingTheme) {
      toast.loading("Updating theme", { id: "saving-hero" })
    } else {
      toast.dismiss("saving-hero")
    }
  }, [isUpdatingTheme])

  return (
    <div>
      <Loading open={isUpdatingTheme || isDirty || isLoadingTheme} />
      <Formik
        enableReinitialize
        initialValues={{
          image: "",
          headline: "",
          text: "",
          "button-url": "",
          "button-text": "",
          ...initialValues,
        }}
        onSubmit={(values, { setSubmitting }) => {
          const vals = { ...values }
          let content = cob
          if (!content) content = {}
          if (!content.sections) content.sections = {}
          content.sections = {
            ...content?.sections,
            "section-hero": {
              ...content.sections["section-hero"],
              settings: { ...vals, image },
            },
          }
          const modfTemp = tpl
          modfTemp.content = JSON.stringify(content)
          const modfTheme = theme

          modfTheme!.templates![ind!] = modfTemp
          update(modfTheme!)
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
              <h2 className="text-2xl text-gray-800 font-bold mb-5">Hero</h2>
              <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <SimpleImageDropzone
                      onChange={onImageChange}
                      label={"Hero Banner"}
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
                      value={values["button-text"]}
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
                      value={values["button-url"]}
                      className="form-input w-full"
                      type="text"
                      placeholder="/collections/all"
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

export default Hero
