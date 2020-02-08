import { AxiosRequestConfig, AxiosPromise, Method } from "../types";
import dispatchRequest from './dispatchRequest'
export default class Axios {
    request(url: any, config?: any): AxiosPromise {
        if (typeof url === "string") {
            if (!config) {
                config = {}
            }
            config.url = url
        } else {
            config = url
        }
        return dispatchRequest(config)
    }
    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithData("get", url, config)
    }
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithData("delete", url, config)
    }
    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithData("head", url, config)
    }
    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithData("options", url, config)
    }
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithData("post", url, config, data)
    }
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithData("put", url, config, data)
    }
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this.requestMethodWithData("patch", url, config, data)
    }
    requestMethodWithData(method: Method, url: string, config?: AxiosRequestConfig, data?: any, ) {
        return this.request(Object.assign(config || {}, { method, url, data }))
    }
}