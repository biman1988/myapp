var mongoose = require('../dbconn');

var cmsSchema = mongoose.Schema({
    post_title: { type: String, required: true },
    post_content: { type: String, required: true },
});

var CMS = mongoose.model('cms', cmsSchema);

module.exports = CMS;