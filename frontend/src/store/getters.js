export default {
    randomVid(state) {
        const vid = state.walk

        const selected_city = Math.floor(Math.random() * vid.length);

        const selected_video = Math.floor(Math.random() * vid[selected_city].video_id.length);

        const currentVideo = vid[selected_city].video_id[selected_video];
        /*
        const videoUrl = 'https://www.youtube.com/watch?v=' + currentVideo + '&t=40';
        const currentCity = this.data[selected_city].city
        const currentCountry = this.data[selected_city].country

         */
        return currentVideo
    },
}
