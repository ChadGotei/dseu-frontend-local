import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePdf } from "../../utils/apiservice";
import { QUERY_KEYS } from "../../utils/queryKeys";
import { showErrorToast, showSuccessToast } from "../../utils/toasts";

export const useDeletePdfOptimistic = ({
    isArchived,
    currentPage,
    filters,
    section,
}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePdf,
        onMutate: async (id) => {
            const queryKey = [
                QUERY_KEYS.GET_NOTICES,
                isArchived,
                currentPage,
                filters.searchInput,
                filters.startDate,
                filters.endDate,
                section,
            ];

            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey });

            // Snapshot the previous data
            const previousData = queryClient.getQueryData(queryKey);

            // Optimistically update cache
            queryClient.setQueryData(queryKey, (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        notices: oldData.data.notices.filter(
                            (notice) => notice._id !== id
                        ),
                    },
                };
            });

            return { previousData, queryKey };
        },
        onError: (err, id, context) => {
            // Rollback on error
            if (context?.previousData) {
                queryClient.setQueryData(context.queryKey, context.previousData);
            }
            showErrorToast("Failed to delete PDF!")
        },
        onSettled: (_, __, ___, context) => {
            if (context?.queryKey) {
                queryClient.invalidateQueries({ queryKey: context.queryKey });
            }
        },
        onSuccess: () => {
            showSuccessToast("PDF deleted successfully!");
        },
    });
};
