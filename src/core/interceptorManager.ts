import { ReslovedFn, RejectdFn } from '../types'
interface interceptor<T> {
    resolved: ReslovedFn<T>
    rejected?: RejectdFn
}
export default class InterceptorManager<T> {
    private interceptors: Array<interceptor<T> | null>
    constructor() {
        this.interceptors = []
    }
    forEach(fn: (interceptor: interceptor<T>) => void) {
        this.interceptors.forEach(interceptor => {
            if (interceptor !== null) {
                fn(interceptor)
            }
        })
    }
    use(resolved: ReslovedFn<T>, rejected?: RejectdFn): number {
        this.interceptors.push({
            resolved,
            rejected
        })
        return this.interceptors.length - 1
    }
    eject(id: number): void {
        if (this.interceptors[id]) {
            this.interceptors[id] = null
        }
    }
}