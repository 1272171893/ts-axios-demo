import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/headers'
import { transfromRequest, transfromResponse } from './helpers/data'
const defaults: AxiosRequestConfig = {
    method: "get",
    timeout: 0,
    headers: {
        common: {
            Accept: "application/json,text/plain,*/*"
        }
    },
    transformRequest: [
        function (data: any, headers: any): any {
            processHeaders(headers, data)
            return transfromRequest(data)
        }
    ],
    transformResponse: [
        function (data: any): any {
            return transfromResponse(data)
        }
    ]
}
const methodNoData = ["delete", "get", "head", "options"]
methodNoData.forEach(method => {
    defaults.headers[method] = {}
})
const methodWithData = ["post", "put", "patch"]
methodNoData.forEach(method => {
    defaults.headers[method] = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
export default defaults