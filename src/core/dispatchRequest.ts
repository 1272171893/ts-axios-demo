import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transfromRequest, transfromResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then(res => {
        return transromResponseData(res)
    })
}

function processConfig(config: AxiosRequestConfig): void {
    config.url = transfromURL(config)
    config.headers = transfromHeaders(config)
    config.data = transfromRequestData(config)
}

function transfromURL(config: AxiosRequestConfig): string {
    const { url, params } = config
    return buildURL(url!, params)
}

function transfromRequestData(config: AxiosRequestConfig): any {
    return transfromRequest(config)
}

function transfromHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config
    return processHeaders(headers, data)
}

function transromResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transfromResponse(res.data)
    return res
}