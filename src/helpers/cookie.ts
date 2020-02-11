const cookie = {
    read(name: string): string | null {
        const regExp = new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
        const match = document.cookie.match(regExp)
        return match ? decodeURIComponent(match[3]) : null
    }

}
export default cookie