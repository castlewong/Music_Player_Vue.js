
// 我他喵的还就发现了, 我动不动就是因为没有el上而出不来效果
var app = new Vue({
    el: "#player",
    data: {
        query:"",
        musicList:[]
    },
    methods: {
        searchMusic: function(){
            // this has changed
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                // console.log(response);
                that.musicList = response.data.result.songs;
            },function(err){})
        }
    },
})