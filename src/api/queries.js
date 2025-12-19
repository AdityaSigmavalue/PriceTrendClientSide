import { useQuery, useMutation } from "@tanstack/react-query";
import api from "./client";




export const useUploadExcel = () => {
    useMutation({
        mutationFn: async (file) => {
            const formData = new FormData();
            formData.append("excel file", file);

            const res = await api.post("upload/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        }
    })
};

export const useTrendData = ({ location, year, propertyData, percentile, metric }) => {
    useQuery({
        queryKey: ["trend", location, year, propertyData, percentile, metric],
        enabled: !!location,
        queryFn: async () => {
            const params = {};

            if (year) params.year = year;
            if (propertyType && propertyType !== "all") params.property_type = propertyType;
            if (percentile) params.percentile = percentile;
            if (metric) params.metric;

            const res = await api.get(`trend/${encodeURIComponent(location)}/`, {
                params,
            });
            return res.data;
        },
    });
}