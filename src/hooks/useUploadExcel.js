import { useUploadExcel as useUploadExcelMutation } from "../api/queries.js";

export const useUploadExcel = () => {
    const mutation = useUploadExcelMutation();

    const upload = (file, options = {}) => {
        if (!file) return;
        mutation.mutate(file, options);
    }

    return {
        upload,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        error: mutation.error,
        data: mutation.data,
    };
};