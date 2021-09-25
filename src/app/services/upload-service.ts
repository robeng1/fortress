import { ProgressServerConfigFunction } from 'filepond';

export const server = {
  process: (
    fieldName: string,
    file: File,
    metadata: { [key: string]: any },
    load: (p: string | { [key: string]: any }) => void,
    error: (errorText: string) => void,
    progress: ProgressServerConfigFunction,
    abort: () => void,
  ) => {
    // TODO: request the signed url and use it to upload the file here
    // examine the filetypes and generate the key

    // fieldName is the name of the input field
    // file is the actual file object to send
    const formData = new FormData();
    formData.append(fieldName, file, file.name);

    const request = new XMLHttpRequest();
    request.open('PUT', 'url-to-api');

    // Should call the progress method to update the progress to 100% before calling load
    // Setting computable to false switches the loading indicator to infinite mode
    request.upload.onprogress = e => {
      progress(e.lengthComputable, e.loaded, e.total);
    };

    // Should call the load method when done and pass the returned server file id
    // this server file id is then used later on when reverting or restoring a file
    // so your server knows which file to return without exposing that info to the client
    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        // the load method accepts either a string (id) or an object
        load(request.responseText);
      } else {
        // Can call the error method if something is wrong, should exit after
        error('oh no');
      }
    };

    request.send(formData);

    // Should expose an abort method so the request can be cancelled
    return {
      abort: () => {
        // This function is entered if the user has tapped the cancel button
        request.abort();

        // Let FilePond know the request has been cancelled
        abort();
      },
    };
  },
  load: () => {},
  revert: () => {},
  fetch: () => {},
  restore: () => {},
  remove: () => {},
};
