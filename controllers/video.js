var Video = require("../models/video.js");
var Channel = require("../models/channel.js")

var ObjectId = require('mongoose').Types.ObjectId;
var unorm = require('unorm');
module.exports = {
    registerRoutes: function (app) {

        app.post("/getAllVideoByCategory", this.getAllVideoByCategory);
        app.post("/getAllVideoFirstTime",this.getAllVideoFirstTime);
        app.post("/findAllVideoByName",this.findAllVideoByName);
        app.post("/getAllVideoByCategoryWeb",this.getAllVideoByCategoryWeb);
        app.post("/deleteVideoWeb",this.deleteVideoWeb);
        app.get("/videoweb",this.videoweb);
        app.post("/saveVideoWeb",this.saveVideoWeb)


    },

    saveVideoWeb : function(req,res,next) {
        var video = req.body.video;
        var channelrequest = req.body.channel;

            var saveVideo = new Video({
                name: video.name,
                image : video.image,
                url : video.youtubeid,
                unicodeName : video.unicodeName,
                isVideo : video.isVideo,
                createdTime : new Date(),
                channel :{
                   _id : channelrequest
                }
            });
            saveVideo.save(function(error){
                if (error) res.json({msgId:"fail"});
                return res.json({ msgId: "done" })
            });



    },

    videoweb : function(req,res,next) {
      return res.render('video');
    },

    deleteVideoWeb : function(req,res,next) {
        var videoID =  req.body.videoID;
         Video.find({"_id":ObjectId(videoID)}).remove().exec(function(error,value){
            return res.json({ msgId: "done" })
         });
    },

    getAllVideoByCategoryWeb : function(req, res, next) {
        var categoryID =  req.body.categoryID;
        var skipVideo = req.body.skip;

        Channel.find({"category.$id": ObjectId(categoryID)},'ObjectId',function(error,result){
            console.dir("channel list" + result);
            var channelList = new Array();
            for(channelId in result){
                channelList.push(result[channelId]._id);
            }
            Video.find({}).sort({'name':1})
                .where('channel.$id')
                .in(channelList)
                .exec(function(error,video){
                    res.json (video.map ( function(returnVideo){
                        return {
                            id: returnVideo._id,
                            name : returnVideo.name,
                            image: returnVideo.image,
                            url: returnVideo.url

                        }
                    }));

                });
        });
    },

    getAllVideoByCategory: function (req, res, next) {
        var categoryID =  req.body.categoryID;
        var skipVideo = req.body.skip;
        var limitVideo = 5;

        Video.find({}).sort({date:-1}).skip(skipVideo).limit(5)
           .exec(function(error,video){
                res.json (video.map ( function(returnVideo){
                    return {
                        id: returnVideo._id,
                        name : returnVideo.name,
                        image: returnVideo.image,
                        url: returnVideo.url

                    }
                }));

            });
    },


    findAllVideoByName : function(req,res,next) {
        var text =  req.body.videoName;
        var combining = /[\u0300-\u036F]/g;
        var data = unorm.nfkd(text).replace(combining, '');
        Video.find({'unicodeName': new RegExp(data,'i')},function(err, video){
            res.json (video.map ( function(returnVideo){
                return {
                    id: returnVideo._id,
                    name : returnVideo.name,
                    image: returnVideo.image,
                    url: returnVideo.url
                }
            }));
        }).sort("name").limit(20);
    },

    getAllVideoFirstTime : function(req,res,next) {
        var skipVideo = req.body.skip;
        var limitVideo = 5;

        Video.count(function(err, count){
            Video.find({}).sort({date:-1}).skip(skipVideo).limit(5)

                .exec(function(error,video){
                    res.json (video.map ( function(returnVideo){
                        return {
                            id: returnVideo._id,
                            name : returnVideo.name,
                            image: returnVideo.image,
                            url: returnVideo.url,
                            total:count
                        }
                    }));

                });
        });
    }



};