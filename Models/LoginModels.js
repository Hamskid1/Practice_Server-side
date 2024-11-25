import mongoose from "mongoose";
const loginSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    }
}, { timestamps: true })

const Login = mongoose.model('Login', loginSchema);
export default Login;