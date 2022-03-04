import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { UidAtom } from 'store/authorization-atom';

export const useIsMe = (userId: string | undefined) => {
  const [id] = useAtom(UidAtom);
  const isMe = useMemo(() => {
    return !id || !userId ? false : id === userId;
  }, [id, userId]);

  return isMe;
};
