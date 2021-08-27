export default {
    walkVid(state) {
        const vid = state.walk
        return vid
    },
    city(state){
        const vid = state.walk
        const selected_city = Math.floor(Math.random() * vid.length);

        return selected_city
    },
    randomVid(state, getters) {
        const vid = state.walk
        const selected_city = getters.city;

        const selected_video = Math.floor(Math.random() * vid[selected_city].video_id.length);
        const currentVideo = vid[selected_city].video_id[selected_video];
        const videoUrl = 'https://www.youtube.com/watch?v=' + currentVideo + '&t=40';
        /*
        const currentCity = this.data[selected_city].city

        const currentCountry = this.data[selected_city].country
         */
        return videoUrl
    },
    currentCity(state, getters) {
        const vid = state.walk
        const selected_city = getters.city
        const currentCity = vid[selected_city].city

        return currentCity
    },
    currentCountry(state, getters) {
        const vid = state.walk
        const selected_city = getters.city
        const currentCountry = vid[selected_city].country

        return currentCountry
    },
    moveMap(state, getters) {
        const vid = state.walk
        const selected_city = getters.city
        const coordinates = vid[selected_city].zoom
        // string into number array
        const array = coordinates.split(",").map(Number)
        return array
    }
}
