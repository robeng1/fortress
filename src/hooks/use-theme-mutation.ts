import { Theme } from 'typings/theme/theme';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { fortressURL } from 'endpoints/urls';
import useShop from './use-shop';
import useTheme from './use-theme';
import { request, ResponseError } from 'utils/request';
import { b64Encode, base64Decode } from 'utils/buff';

export function useThemeMutation() {
  const qc = useQueryClient();
  const { shop } = useShop();
  const { theme } = useTheme();
  const config = theme?.config;
  if (typeof config?.settings === 'string') {
    const b64: string = theme?.config?.settings as unknown as string;
    if (config) {
      config.settings = base64Decode(b64) as Record<string, any>
    }
  }

  const { mutate: updateTheme, isLoading: isUpdatingTheme } = useMutation(
    (payload: Theme) =>
      request(`${fortressURL}/shops/${shop?.shop_id}/themes/${theme?.id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (updatedTheme: Theme) => {
        qc.setQueryData(['theme'], updatedTheme);
        toast.success('Site updated successfully');
      },
      onError: (e: ResponseError) => {
        toast.error(e.message);
      },
    },
  );
  const update = (payload: Theme) => {
    updateTheme({
      ...payload,
      config: {
        ...payload.config,
        settings: b64Encode(payload.config?.settings)
      },
    })
  }
  return {
    update,
    updateTheme,
    isUpdatingTheme,
    theme,
    config,
  };
}
