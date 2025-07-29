
import { CommonService } from "../service";
import { ApiResponse } from "../services";

/***********
 * DES:service call for dashboard page
 */

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

/***********
 * DES:service call for vendor comparission page
 */

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


/***********
 * DES:service call for top spender page
 */


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

/***********
 * DES:service call for complaince matrix page
 */


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

/***********
 * DES:service call for transaction page
 */

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

/***********
 * DES:service call for AI insights page
 */

export const AIInsightService = CommonService.enhanceEndpoints({
  addTagTypes: ["aiinsight"],
}).injectEndpoints({
    endpoints: (build) => ({
        getinsightService: build.query<ApiResponse<any>, { RequestDataFormat: any }>({
            query: (params) => ({
                url: params.RequestDataFormat.url,
                method: "GET",
                params: params.RequestDataFormat.data
            }),
            providesTags: ["aiinsight"],
        })
    }),
    overrideExisting: true,
});

export const {
    useLazyGetinsightServiceQuery
} = AIInsightService;























/***********
 * DES:service call common login ,logout
 */


export const commonServices = CommonService.enhanceEndpoints({
  addTagTypes: ["commonServices"],
}).injectEndpoints({
  endpoints: (build) => ({
    postCommonService: build.mutation<ApiResponse<any>, {RequestDataFormat: any }>({
      query: ({ params }: any) => {
        console.log(params)
        return {
        url: params.RequestDataFormat.url,
        method: "POST",
        body: params.RequestDataFormat.data,
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
    usePostCommonServiceMutation
} = commonServices;