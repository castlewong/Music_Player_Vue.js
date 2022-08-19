// Every detail counts, since if it doesn't, it won't work.
// 请求地址: https://autumnfish.cn/mv/url
// 请求方法: get 请求参数: ID (mvid, 为0说明没有MV) 响应内容: MV的地址
var app = new Vue({
    el: "#player",
    data: {
        //keyword for query
        query:"",
        //array of songs
        musicList:[],
        //address of songs
        musicUrl: "",
        //cover of songs
        musicCover: "",
        //hot comments of songs
        hotComments: [],
        //situation of animation
        isPlaying: false,
        //show situ of mask layer
        isShow: false,
        //MV address
        mvUrl: ""
    },
    methods: {
        // search songs
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
        // play songs
        playMusic: function(musicId) {
            var that = this;
            // get url of the song
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
            .then(function(response) {
                that.musicUrl = response.data.data[0].url;
            },
            function(err) {});
            // get the details of songs
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
            .then(function(response) {
                // console.log(response);
                // console.log(response.data.songs[0].al.picUrl)
                that.musicCover = response.data.songs[0].al.picUrl;
            },function(err) {});
            axios.get("https:/autumnfish.cn/comment/hot?type=0&id=" + musicId)
            .then(function(response) {
                // console.log(response);
                that.hotComments = response.data.hotComments;
            },function(err) {})
        },
        play: function () {
            // console.log("play");
            this.isPlaying = true;
        },
        pause: function () {
            // console.log("pause")
            this.isPlaying = false;
        },
        playMV: function (mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
            .then(function(response) {
                console.log(response);
                console.log(response.data.data.url);
                that.isShow = true;
                that.mvUrl = response.data.data.url;
            }, function(err) {})
        },
        hide: function () {
            this.isShow = false;
            this.mvUrl = "";
        }
    },
});