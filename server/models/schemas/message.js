const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    fromPlayerId: { type: Types.ObjectId, required: true },
    toPlayerId: { type: Types.ObjectId, required: true },
    message: { type: Types.String, required: true },
    sentDate: { type: Types.Date, required: true },
    read: { type: Types.Boolean, required: true, default: false }
});

module.exports = schema;
