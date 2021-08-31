import {
    GET_RANDOM_WALK,
    SELECT_WALK
} from "./mutation-types";

export default {
    [GET_RANDOM_WALK] (state,payload) {
        state.selectedWalk = payload
    },
    [SELECT_WALK] (state,payload) {
        state.selectedWalk = payload
    },
}
