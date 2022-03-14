import React from 'react';
import Uppy from '@uppy/core';
import Transloadit from '@uppy/transloadit';

import DropTarget from '@uppy/drop-target';
import useShop from './use-shop';

export const useUploadManager = (key, uploadCompleteCallback) => {
  const { shop } = useShop();
  const uppy = React.useMemo(() => {
    return new Uppy({
      id: key,
      autoProceed: false,
      restrictions: {
        maxFileSize: 15 * 1024 * 1024,
        maxNumberOfFiles: 6,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*'],
      },
      onBeforeUpload: files => {
        const updatedFiles = {};
        Object.keys(files).forEach(fileId => {
          updatedFiles[fileId] = {
            ...files[fileId],
            name: `reoplex_${shop?.shop_id || 'shop_demo'}_p_${
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
        uploadCompleteCallback([
          // ...images,
          ...assembly.results[':original'].map(item => ({
            name: item.basename,
            url: item.ssl_url,
          })),
        ]);
      });
  }, [shop?.shop_id]);
  return uppy;
};
