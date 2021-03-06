import Vue from "vue";
import cookies from "vue-cookies";
Vue.use(cookies);
import {
    FETCH_BOARD,
    FETCH_BOARD_LIST, FETCH_COMMENT, FETCH_COMMENT_LIST, FETCH_MEMBER, FETCH_REPLY, FETCH_REPLY_LIST, FETCH_SESSION,
    GET_RANDOM_BIKE, GET_RANDOM_CAR, GET_RANDOM_MOTORCYCLE, GET_RANDOM_WALK,
    SELECT_BIKE, SELECT_CAR, SELECT_MOTORCYCLE, SELECT_WALK,
} from "./mutation-types";
import axios from "axios";



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
    // Board
    fetchBoardList ({ commit }) {
        return axios.get(`https://goforbackend.herokuapp.com/board/lists`)
            .then((res) => {
                commit(FETCH_BOARD_LIST, res.data)
            })
    },
    fetchBoard ({ commit }, boardNo) {
        return axios.get(`https://goforbackend.herokuapp.com/board/${boardNo}`)
            .then((res) => {
                commit(FETCH_BOARD, res.data)
            })
    },
    fetchCommentList ({ commit }, boardNo) {
        return axios.get(`https://goforbackend.herokuapp.com/comment/lists/${boardNo}`)
            .then((res) => {
                commit(FETCH_COMMENT_LIST, res.data)
            })
    },
    fetchComment ({ commit }, commentNo) {
        return axios.get(`https://goforbackend.herokuapp.com/comment/${commentNo}`)
            .then((res) => {
                commit(FETCH_COMMENT, res.data)
            })
    },
    fetchReplies({ commit }, commentNo) {
        return axios.get(`https://goforbackend.herokuapp.com/reply/lists/${commentNo}`)
            .then((res) => {
            commit(FETCH_REPLY_LIST, res.data)
        })
    },
    fetchReply({ commit }, replyNo) {
        return axios.get(`https://goforbackend.herokuapp.com/reply/${replyNo}`)
            .then((res) => {
                commit(FETCH_REPLY, res.data)
            })
    },
    fetchMember ({ commit }, memberId) {
        return axios.get(`https://goforbackend.herokuapp.com/member/read/${memberId}`)
            .then((res) => {
                commit(FETCH_MEMBER, res.data)
            })
    },
    fetchSession ({ commit }) {
        let data = Vue.$cookies.get('user')

        if(data !== null){
            commit(FETCH_SESSION, data)
        }else{
            commit(FETCH_SESSION, null)
        }
    },
    removeSession ({ commit }) {
        Vue.$cookies.remove('user')
        commit(FETCH_SESSION, null)
    },
}
