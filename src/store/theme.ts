import { atomWithQuery } from 'jotai/query';

export const themeAtom = atomWithQuery(() => ({
  queryKey: 'theme',
  queryFn: async (): Promise<any> => {
    await new Promise(r => setTimeout(r, 1000));
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    return res.json();
  },
}));
