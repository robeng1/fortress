import slugify from 'slugify';
import Robodog from '@uppy/robodog';
import useShop from './use-shop';

export const useUpload = () => {
  const { shop } = useShop();
  const upload = (files: File[]) => {
    return Robodog.upload(files, {
      params: {
        auth: {
          key: 'd6650968a1064588ae29f3d0f6a70ef5',
        },
        template_id: '24f76f542f784c4cba84bf1e347a84fb',
      },
      alwaysRunAssembly: true,
      allowMultipleUploadBatches: true,
      waitForEncoding: true,
      waitForMetadata: true,
      service: 'https://api2.transloadit.com',
      onBeforeUpload: files => {
        const updatedFiles = {};
        Object.keys(files).forEach(fileId => {
          updatedFiles[fileId] = {
            ...files[fileId],
            name: `reoplex_${shop?.shop_id || 'shop_demo'}_${slugify(
              files[fileId].name,
            )}`,
          };
        });
        return updatedFiles;
      },
    });
  };
  return {
    upload,
  };
};
