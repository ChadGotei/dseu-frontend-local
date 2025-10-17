import { useQuery } from "@tanstack/react-query";
import { getExaminationsBySection } from "../../utils/apiservice";
import { QUERY_KEYS } from '../../utils/queryKeys'

export const useExaminations = (section) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_EXAMINATION_NOTICES, section],
        queryFn: () => getExaminationsBySection(section),
        staleTime: 7 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        enabled: !!section,
    });
};