import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id:{
        type: Number,
        trim: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: [true, 'First name is required.'],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    domain: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

export default User;
