import { Buffer } from 'buffer';
import { Theme } from 'typings/theme/theme';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { fortressURL } from 'endpoints/urls';
import useShop from './use-shop';
import useTheme from './use-theme';
import { request, ResponseError } from 'utils/request';

export function useThemeMutation() {
  const qc = useQueryClient();
  const { shop } = useShop();
  const { theme } = useTheme();
  const config = theme?.config;
  if (typeof config?.settings === 'string') {
    const b64: string = theme?.config?.settings as unknown as string;
    if (config)
      config.settings = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
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
        toast('Site updated successfully');
      },
      onError: (e: ResponseError) => {
        toast(e.message);
      },
    },
  );
  return {
    updateTheme,
    isUpdatingTheme,
    theme,
    config,
  };
}
