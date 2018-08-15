
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var Message = new Schema({
    name:String,
    text: String,
    time: {
        type: Date,
        default : Date.now()
    }
});
// 将数据模型暴露出去
module.exports = mongoose.model('msg', Message,'msg');