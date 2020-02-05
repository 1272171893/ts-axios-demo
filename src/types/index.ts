export type Method = "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "POST" | "post" | "PUT" | "put" | "PATCH" | "patch"

export interface AxiosRequestConfig {
    url: string
    method?: Method
    data?: any
    params?: any
}