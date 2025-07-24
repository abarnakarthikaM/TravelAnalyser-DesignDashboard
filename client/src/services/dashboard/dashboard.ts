
import { CommonService } from "../service";
import { ApiResponse } from "../services";

export const service = CommonService.enhanceEndpoints({
  addTagTypes: ["dashboard"],
}).injectEndpoints({
    endpoints: (build) => ({
        getDashboardOverview: build.query<ApiResponse<any>, { RequestDataFormat: any }>({
            query: (params) => ({
                url: params.RequestDataFormat.url,
                method: "GET",
                params: params.RequestDataFormat.data
            }),
            providesTags: ["dashboard"],
        })
    }),
    overrideExisting: true,
});

export const {
    useLazyGetDashboardOverviewQuery,
} = service;


export const vendorcomparisionservice = CommonService.enhanceEndpoints({
  addTagTypes: ["vendorcomparision"],
}).injectEndpoints({
    endpoints: (build) => ({
        getVendorComparision: build.query<ApiResponse<any>, { RequestDataFormat: any }>({
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
    useLazyGetVendorComparisionQuery
} = vendorcomparisionservice;




export const topSpenderService = CommonService.enhanceEndpoints({
  addTagTypes: ["topspender"],
}).injectEndpoints({
    endpoints: (build) => ({
        gettopSpender: build.query<ApiResponse<any>, { RequestDataFormat: any }>({
            query: (params) => ({
                url: params.RequestDataFormat.url,
                method: "GET",
                params: params.RequestDataFormat.data
            }),
            providesTags: ["topspender"],
        })
    }),
    overrideExisting: true,
});

export const {
    useLazyGettopSpenderQuery
} = topSpenderService;



export const compliancemetricsService = CommonService.enhanceEndpoints({
  addTagTypes: ["complaincemetrics"],
}).injectEndpoints({
    endpoints: (build) => ({
        getCompliancemetrics: build.query<ApiResponse<any>, { RequestDataFormat: any }>({
            query: (params) => ({
                url: params.RequestDataFormat.url,
                method: "GET",
                params: params.RequestDataFormat.data
            }),
            providesTags: ["complaincemetrics"],
        })
    }),
    overrideExisting: true,
});

export const {
    useLazyGetCompliancemetricsQuery
} = compliancemetricsService;


export const transactionService = CommonService.enhanceEndpoints({
  addTagTypes: ["transaction"],
}).injectEndpoints({
    endpoints: (build) => ({
        getTransactionService: build.query<ApiResponse<any>, { RequestDataFormat: any }>({
            query: (params) => ({
                url: params.RequestDataFormat.url,
                method: "GET",
                params: params.RequestDataFormat.data
            }),
            providesTags: ["transaction"],
        })
    }),
    overrideExisting: true,
});

export const {
    useLazyGetTransactionServiceQuery
} = transactionService;
