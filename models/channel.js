var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var channelSchema = mongoose.Schema({
    id: String,
    name: String,
    channelName: String,
    channelUrl: String,
    category: { type: Schema.Types.ObjectId, ref: 'VideoCategory' }
});

/*videoSchema.methods.getOrders = function(){
 userModel.count({name: 'anand'}, function(err, c)
 //return Order.find({ customerId: this._id }, cb);
 };*/

var Channel = mongoose.model('channel',channelSchema,"channel");
module.exports = Channel;
