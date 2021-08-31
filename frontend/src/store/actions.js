import {
    GET_RANDOM_BIKE, GET_RANDOM_CAR, GET_RANDOM_MOTORCYCLE, GET_RANDOM_WALK,
    SELECT_BIKE, SELECT_CAR, SELECT_MOTORCYCLE, SELECT_WALK,
} from "./mutation-types";



export default {
    // walk
    getRandomWalk({ commit, state }) {
        const data = state.walk
        const selected_city = Math.floor(Math.random() * data.length)
        const currentCity = data[selected_city]
         {
            commit(GET_RANDOM_WALK, currentCity)
        }
    },
    selectWalk({ commit }, selectedVideo) {
        commit(SELECT_WALK, selectedVideo)
    },
    // bike
    getRandomBike({ commit, state }) {
        const data = state.bike
        const selected_city = Math.floor(Math.random() * data.length)
        const currentCity = data[selected_city]
        {
            commit(GET_RANDOM_BIKE, currentCity)
        }
    },
    selectBike({ commit }, selectedVideo) {
        commit(SELECT_BIKE, selectedVideo)
    },
    // motorcycle
    getRandomMotorcycle({ commit, state }) {
        const data = state.motorcycle
        const selected_city = Math.floor(Math.random() * data.length)
        const currentCity = data[selected_city]
        {
            commit(GET_RANDOM_MOTORCYCLE, currentCity)
        }
    },
    selectMotorcycle({ commit }, selectedVideo) {
        commit(SELECT_MOTORCYCLE, selectedVideo)
    },
    // car
    getRandomCar({ commit, state }) {
        const data = state.car
        const selected_city = Math.floor(Math.random() * data.length)
        const currentCity = data[selected_city]
        {
            commit(GET_RANDOM_CAR, currentCity)
        }
    },
    selectCar({ commit }, selectedVideo) {
        commit(SELECT_CAR, selectedVideo)
    },
}
