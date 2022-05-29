import React, { useEffect, useState } from "react"
import _ from "lodash"
import FileUploadField from "components/blocks/file-upload-field"
import RadioGroup from "components/radio-group"
import DraggableTable from "components/templates/draggable-table"
import { useDeleteImage } from "hooks/use-delete-image"
import { useUpload } from "hooks/use-upload"
import toast from "react-hot-toast"
import BodyCard from "components/blocks/body-card"

const columns = [
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ cell }) => {
      return (
        <div className="py-base lg:w-[176px] xsm:w-[80px]">
          <img
            className="h-[80px] w-[80px] object-cover rounded"
            src={cell.row.original.url}
          />
        </div>
      )
    },
  },
  {
    Header: "File Name",
    accessor: "name",
    Cell: ({ cell }) => {
      return (
        <div className="lg:w-[700px] md:w-[400px] sm:w-auto">
          <p className="inter-xs-regular">{cell.row.original?.name}</p>
          <span className="inter-sm-regular text-grey-50">
            {typeof cell.row.original.size === "number"
              ? `${(cell.row.original.size / 1024).toFixed(2)} KB`
              : cell.row.original?.size}
          </span>
        </div>
      )
    },
  },
]

const Images = ({ product, handleUpload, handleIsSaving }) => {
  const { upload } = useUpload()
  const [images, setImages] = React.useState<any[]>([])
  const [uploads, setUploads] = useState([])
  const [hasImagesChanged, setHasImagesChanged] = React.useState(false)
  const [isSavingImages, setIsSavingImages] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  const appendImage = (image) => {
    setHasImagesChanged(true)
    setImages([...images, image])
  }

  const removeImage = (image) => {
    setHasImagesChanged(true)
    const tmp = images.filter((img) => img.url !== image.url)
    setImages(tmp)
  }
  useEffect(() => {
    if (product) {
      let photos = product.images.map(({ url }) => {url})
      photos = [...new Set(photos)].filter(Boolean)
      setImages([...photos])
    }
  }, [product])

  const handleSave = () => {
    setIsSavingImages(true)
    handleIsSaving(true)
    upload(uploads)
      .then(({ results }) => {
        const uploaded = results?.map(({ ssl_url }) => ssl_url)
        return uploaded
      })
      .then((uploadedImages) => {
        const minusLocalImages = _.difference(
          images,
          uploads.map((u) => u["preview"])
        )
        const allImages = [...minusLocalImages, ...(uploadedImages ?? [])]
        setIsSavingImages(false)
        handleIsSaving(false)
        setUploads([])
        setIsDirty(false)
        toast.success("Images uploaded")
        handleUpload(allImages)
      })
  }

  return (
    <BodyCard title="Images" subtitle="Add up to 10 images to your product">
      <div className="mt-base">
        <DraggableTable
          onDelete={removeImage}
          columns={columns}
          entities={images}
          setEntities={setImages}
        />
      </div>
      <div className="mt-2xl">
        <FileUploadField
          onFileChosen={(files) => {
            const file = files[0]
            const url = URL.createObjectURL(file)
            appendImage({
              url,
              preview: url,
              name: file.name,
              size: file.size,
              nativeFile: file,
            })
          }}
          placeholder="1200 x 1600 (3:4) recommended, up to 10MB each"
          filetypes={["png", "jpg", "jpeg"]}
          className="py-lg"
        />
      </div>
    </BodyCard>
  )
}

export default Images
