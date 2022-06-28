import { useCallback, useEffect, useRef } from 'react';

import { useRegisterSW } from 'virtual:pwa-register/react';
import toast from 'react-hot-toast';
import Button from 'components/blocks/button';

function SW() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);
  }, [setOfflineReady, setNeedRefresh]);

  useEffect(() => {
    if (offlineReady) {
      toast.success('App is ready to work offline', {
        position: "bottom-left"
      })
    } else if (needRefresh) {
      toast((t) => (
        <span>
          <Button onClick={() => updateServiceWorker(true)}>
            Reload
          </Button>
        </span>
      ));
    }
  }, [close, needRefresh, offlineReady, updateServiceWorker]);
  return null;
}

export default SW