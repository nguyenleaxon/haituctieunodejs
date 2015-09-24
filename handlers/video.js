exports.beep = function(req, res){
/*
    Video.find({},function(err, video) {
        if (err) return console.error(err);
        console.log(video);
        res.json(video.map(function(a){

            return {
                id: a._id,
                image: a.image,
                url: a.url,
                videoCategory: a.videoCategory

            }
        }));
    });
*/


   /* Video.find({}).exec(function (err, video) {
            if (err) return console.error("loi ####" +err);

           console.log(video);

        })
*/

};
exports.findVideoByCategory = function(req,res){
  /*  var category = req.query.id;
    console.log(category);*/
    Video.find({"videoCategory.$name": {"name": "unknow"}}, function(err, video) {
        if (err) return console .error (err);
        res.json (video.map ( function(a){
            console.dir(a);
            return {
                id: a. _id,
                image: a. image,
                url: a. url,
                videoCategory: a.videoCategory
            }
        }));
    });

};
