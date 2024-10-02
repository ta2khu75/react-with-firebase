export const CONG = "CONG"
export const TRU = "TRU"
export const DATLAI = "DATLAI"
export const countCong = (payload?: number) => {
    return {
        type: CONG,
        payload
    }
}
export const countTru = (payload?: number) => {
    return {
        type: TRU,
        payload
    }
}
export const countDatLai = () => {
    return {
        type: DATLAI
    }
}