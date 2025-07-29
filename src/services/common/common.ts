import { ApiResponse } from './../services';
import { AuthService } from './../service';
import { AuthResponseData, ForgotPassword, UnAuththenticatedUser } from './userTypes';

// auth url is different for backend
const AUTH_URL = 'https://dev-genai.infinitisoftware.net/travel_spend_api/api/'
// injecting authentication service into base service
const service = AuthService.injectEndpoints({
  endpoints: (build) => ({
    loginAuthService: build.mutation<ApiResponse<any>, UnAuththenticatedUser>({
      query: (params:any) => (
       {
        method: 'POST',
        body:params,
        url:'/auth/login/'
      })
    }),
//     initialAuthService: build.mutation<'', void>({
//       query: () => ({
//         method: 'POST',
//         url: `${AUTH_URL}/checksession/`
//       })
//     }),
    logoutService: build.mutation<'', any>({
      query: (params:any) => ({
        method: 'POST',
        data:params,
        url:'/'
      })
    }),
//     authenticateService: build.mutation<ApiResponse<AuthResponseData>, UnAuththenticatedUser>({
//       query: (data) => {
//         return {
//           method: 'POST',
//           url: `${AUTH_URL}/web_app_login/`,
//           body: data
//         };
//       }
//     }),
//     sendOTPservice: build.mutation<ApiResponse<any>, any>({
//       query: (data) => {
//         return {
//           method : 'POST',
//           url : `/generateOtp/`,
//           body : data
//         }
//       }
//     }),
//     otpAuthencateService: build.mutation<ApiResponse<any>, any>({
//       query: (data) => {
//         return {
//           method : 'POST',
//           url : `/otp_login/`,
//           body : data
//         }
//       }
//     }),
//     resetPasswordService: build.mutation<ApiResponse<undefined>, ForgotPassword>({
//       query: (data) => {
//         return {
//           method: 'POST',
//           url: `${AUTH_URL}/forgotpassword/`,
//           body: data
//         };
//       }
//     })
  }),
  overrideExisting: false
});

export const {
  useLoginAuthServiceMutation:loginAuthService,
  useLogoutServiceMutation:logoutService
  

//   endpoints: { authenticateService, initialAuthService, otpAuthencateService }
} = service;
