
import { CommonService } from "../service";
import { ApiResponse } from "../services";

export const service = CommonService.enhanceEndpoints({
  addTagTypes: ["vendorcomparision"],
}).injectEndpoints({
    endpoints: (build) => ({
        getDashboardOverview: build.query<ApiResponse<any>, { RequestDataFormat: any }>({
            query: (params) => ({
                url: params.RequestDataFormat.url,
                method: "GET",
                params: params.RequestDataFormat.data
            }),
            providesTags: ["vendorcomparision"],
        })
    }),
    overrideExisting: true,
});

export const {
    useLazyGetDashboardOverviewQuery,
} = service;
