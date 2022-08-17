
// Every detail counts, since if it doesn't, it won't work.
var app = new Vue({
    el: "#player",
    data: {
        query:"",

        musicList:[],

        musicUrl: "",

        isPlaying: false
    },
    methods: {
        searchMusic: function(){
            // this has changed
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
                function(response){
                // console.log(response);
                that.musicList = response.data.result.songs;
                console.log(response.data.result.songs);
            },function(err) {});
        },
        playMusic: function(musicId) {
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
            .then(function(response) {
                that.musicUrl = response.data.data[0].url;
            },
            function(err) {}
            );
        },
        play: function () {
            this.isPlaying = true;
        },
        pause: function () {
            this.isPlaying = false;
        }
    },
});