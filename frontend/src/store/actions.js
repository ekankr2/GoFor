import {
    GET_RANDOM_WALK,
    SELECT_VIDEO
} from "./mutation-types";



export default {
    getRandomWalk({ commit, state }) {
        const data = state.walk
        const selected_city = Math.floor(Math.random() * data.length)
        const currentCity = data[selected_city]
         {
            commit(GET_RANDOM_WALK, currentCity)
        }
    },
    selectVideo({ commit}, selectedVideo) {
        commit(SELECT_VIDEO, selectedVideo)
    }
}
