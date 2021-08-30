import {
    GET_RANDOM_WALK,
    SELECT_VIDEO
} from "./mutation-types";

export default {
    [GET_RANDOM_WALK] (state,payload) {
        state.randomWalk = payload
    },
    [SELECT_VIDEO] (state,payload) {
        state.randomWalk = payload
    },
}
