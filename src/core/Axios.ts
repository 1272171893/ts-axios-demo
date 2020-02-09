import { AxiosRequestConfig, AxiosPromise, AxiosResponse, Method, ReslovedFn, RejectdFn } from "../types";
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
interface interceptors {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosResponse>
}
interface PromiseChain<T> {
    resolved: ReslovedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
    rejected?: RejectdFn


}
export default class Axios {
    interceptors: interceptors
    constructor() {
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>()
        }
    }
    request(url: any, config?: any): AxiosPromise {
        if (typeof url === "string") {
            if (!config) {
                config = {}
            }
            config.url = url
        } else {
            config = url
        }
        const chain:PromiseChain<any>[] = [{
            resolved: dispatchRequest,
            rejected: undefined
        }]
        this.interceptors.request.forEach(interceptor=>{
            chain.unshift(interceptor)
        })
        this.interceptors.response.forEach(interceptor=>{
            chain.push(interceptor)
        })
        let promise = Promise.resolve(config)
        while(chain.length){
            const {resolved,rejected}=chain.shift()!
            promise=promise.then(resolved,rejected)
        }
        return promise
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