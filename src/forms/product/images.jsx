import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Flex } from 'rebass';
import { CloseIcon } from 'components/icons/close-icon';
import Card from 'components/blocks/card';
import ImagesDropzone from 'components/image-dropzone';
import { useUpload } from 'hooks/use-upload';

const Images = ({ product, handleUpload, handleIsSaving }) => {
  const { upload } = useUpload();
  const [uploads, setUploads] = useState([]);
  const [images, setImages] = useState([]);
  const [isSavingImages, setIsSavingImages] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (product) {
      let imgs = product.images.map(({ url }) => url);
      imgs = [...new Set(imgs)].filter(Boolean);
      setImages([...imgs]);
    }
  }, [product]);

  const handleSave = () => {
    setIsSavingImages(true);
    handleIsSaving(true);
    upload(uploads)
      .then(({ results }) => {
        const uploaded = results?.map(({ ssl_url }) => ssl_url);
        return uploaded;
      })
      .then(uploadedImgs => {
        const minusLocalImages = _.difference(
          images,
          uploads.map(u => u['preview']),
        );
        const allImages = [...minusLocalImages, ...(uploadedImgs ?? [])];
        setIsSavingImages(false);
        handleIsSaving(false);
        setUploads([]);
        setIsDirty(false);
        // throw a toast
        handleUpload(allImages);
      });
  };

  return (
    <Card mb={2}>
      <Card.Header>Images</Card.Header>
      <Card.Body flexDirection="column" px={3}>
        <ImagesDropzone
          images={images}
          value={uploads}
          onChange={files => {
            setUploads([...uploads, ...files]);
            const merged = [...images, ...files.map(f => f.preview)];
            setImages(merged);
            setIsDirty(true);
          }}
        >
          {images.map(image => (
            <ImagesDropzone.Preview
              key={image}
              onClick={e => {
                e.stopPropagation();
              }}
              sx={{ position: 'relative' }}
              src={image}
            >
              <CloseIcon
                onClick={e => {
                  e.stopPropagation();
                  const newImages = images.filter(img => image != img);
                  setImages(newImages);
                  const newUploads = uploads.filter(
                    img => image != img.preview,
                  );
                  setUploads(newUploads);
                  setIsDirty(true);
                }}
                className="absolute right-1 z-10 top-1 cursor-pointer h-4 w-4 bg-gray-800 text-white"
              />
            </ImagesDropzone.Preview>
          ))}
        </ImagesDropzone>
        <Flex mt={3} justifyContent="flex-end">
          {isDirty && (
            <button
              loading={isSavingImages}
              className="btn bg-purple-600 bg-opacity-100 rounded  text-white"
              onClick={e => {
                e.stopPropagation();
                handleSave();
              }}
            >
              Save
            </button>
          )}
        </Flex>
      </Card.Body>
    </Card>
  );
};

export default Images;
