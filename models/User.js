const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, 'The provided email is not valid.']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: []
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Virtual to return friend count
UserSchema.virtual('friendCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

const User = model('User', UserSchema);

module.exports = User;