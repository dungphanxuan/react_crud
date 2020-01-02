const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Applications = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    os: {
        type: String
    },
    type: {
        type: String
    },
    store_name: {
        type: String
    }
    ,
    identifier: {
        type: String
    }
    ,
    managed: {
        type: String
    }
    ,attributes: {
        type: String
    }
    ,management_flags: {
        type: String
    }
    ,templatesName: {
        type: String
    }
}, {
    collection: 'applications'
});

module.exports = mongoose.model('Applications', Applications);
