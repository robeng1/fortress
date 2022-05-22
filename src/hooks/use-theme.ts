import { request, ResponseError } from 'utils/request';
import { useQuery } from 'react-query';
import useShop from './use-shop';
import { Theme } from 'typings/theme/theme';
import { fortressURL } from 'endpoints/urls';
const initialState: Theme = {};

const fetchThemes = async (id?: string) => {
  try {
    const resp = await request(`${fortressURL}/shops/${id}/themes`);
    const themes: Theme[] = resp?.themes;
    if (themes.length >= 1) {
      return themes[0];
    }
    return initialState;
  } catch (error) {
    return initialState;
  }
};

export default function useTheme() {
  const { shop } = useShop();
  const shopId = shop?.shop_id;
  const {
    data: theme,
    refetch,
    isLoading: isLoadingTheme,
    isIdle,
    isRefetching,
  } = useQuery<Theme>(['theme', shopId], () => fetchThemes(shopId), {
    enabled: !!shopId && shopId != undefined,
    keepPreviousData: true,
  });
  return {
    refetch,
    theme,
    isLoadingTheme,
    isIdle,
    isRefetching,
  };
}
