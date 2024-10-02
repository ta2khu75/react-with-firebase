import { CONG, DATLAI, TRU } from "../action/countAction"

const initState = 0
type Action = {
    type: typeof CONG | typeof TRU | typeof DATLAI,
    payload?: number
}
const countReducer = (state = initState, action: Action) => {
    switch (action.type) {
        case CONG:
            return state + (action?.payload ?? 1)
        case TRU:
            return state - (action?.payload ?? 1)
        case DATLAI:
            return 0;
        default:
            return state
    }
}
export default countReducer;