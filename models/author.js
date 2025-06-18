const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

// Виртуальное свойство для полного имени
AuthorSchema.virtual('name').get(function () {
    return `${this.family_name}, ${this.first_name}`;
});

module.exports = mongoose.model('Author', AuthorSchema);