// hugely inspired from @danoc https://github.com/danoc/react-use-clipboard/blob/master/src/index.tsx
import React from 'react';
import copy from 'copy-to-clipboard';
import useToaster from './use-toaster';
import toast from 'react-hot-toast';

/**
 * @param {string} text
 * @param {Object} options
 * @param {number} options.successDuration - Duration of the success state in milliseconds
 * @param {function} options.onCopied - Callback function to call after copying
 * @returns {Array} returns tuple containing isCopied state and handleCopy function
 */
const useClipboard = (text: string, options: { successDuration?: number, onCopied?: Function } = {}): Array<any> => {
  const [isCopied, setIsCopied] = React.useState(false);
  const successDuration = options?.successDuration ?? 1000;
  const onCopied = options?.onCopied || function () { };

  React.useEffect(() => {
    if (isCopied && successDuration) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopied, successDuration]);

  const handleCopy = React.useCallback(() => {
    copy(text);
    setIsCopied(true);
    toast.success('Link copied')
    onCopied();
  }, [text, onCopied, setIsCopied]);

  return [isCopied, handleCopy];
};

export default useClipboard;
