export function productDescTxtSlicer(txt: string, max: number = 50): string {
    if (txt.length >= max) {
        return `${txt.slice(0, max)}...`
    }
    return txt
}

export function validDigits(n: string): string {
    return Intl.NumberFormat('en-US').format(n)
}