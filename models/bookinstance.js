const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    imprint: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
        default: 'Maintenance'
    },
    due_back: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);