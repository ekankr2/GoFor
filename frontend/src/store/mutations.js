import {
    GET_RANDOM_WALK
} from "./mutation-types";

export default {
    [GET_RANDOM_WALK] (state,payload) {
        state.randomWalk = payload
    }
}
