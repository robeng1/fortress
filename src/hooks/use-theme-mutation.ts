import { Theme } from 'models/theme/theme';
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
