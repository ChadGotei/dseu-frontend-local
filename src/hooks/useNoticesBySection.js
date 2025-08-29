import { getPdfBySections } from "../utils/apiservice";
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../utils/queryKeys';

export const useNoticesBySection = (section, archived = false, limit, page, regex) => {

  return useQuery({
    queryKey: [QUERY_KEYS.GET_NOTICES, section, archived, page, limit, regex],
    queryFn: () => getPdfBySections(section, archived, limit, page, regex),
    enabled: !!section && !!limit && !!page,
    staleTime: 5 * 60 * 1000,
  });
};

