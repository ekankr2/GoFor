import {
    GET_RANDOM_BIKE, GET_RANDOM_CAR, GET_RANDOM_MOTORCYCLE, GET_RANDOM_WALK,
    SELECT_BIKE, SELECT_CAR, SELECT_MOTORCYCLE, SELECT_WALK
} from "./mutation-types";

export default {
    [GET_RANDOM_WALK] (state,payload) {
        state.selectedWalk = payload
    },
    [SELECT_WALK] (state,payload) {
        state.selectedWalk = payload
    },
    // Bike
    [GET_RANDOM_BIKE] (state,payload) {
        state.selectedBike = payload
    },
    [SELECT_BIKE] (state,payload) {
        state.selectedBike = payload
    },
    // Motorcycle
    [GET_RANDOM_MOTORCYCLE] (state,payload) {
        state.selectedMotorcycle = payload
    },
    [SELECT_MOTORCYCLE] (state,payload) {
        state.selectedMotorcycle = payload
    },
    // Car
    [GET_RANDOM_CAR] (state,payload) {
        state.selectedCar = payload
    },
    [SELECT_CAR] (state,payload) {
        state.selectedCar = payload
    },
}
