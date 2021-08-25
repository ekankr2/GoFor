export default {
    randomVid(state) {
        const videoData = state.products;
        const strData = JSON.stringify(videoData);
        /*
        const selected_city = Math.floor(Math.random() * strData.length);

        const selected_video = Math.floor(Math.random() * strData[selected_city].video_id.length);

        const currentVideo = strData[selected_city].video_id[selected_video];
        const videoUrl = 'https://www.youtube.com/watch?v=' + currentVideo + '&t=40';
        const currentCity = this.data[selected_city].city
        const currentCountry = this.data[selected_city].country

         */

        return strData;

    }
}
