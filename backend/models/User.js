import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
    },
    points: {
        type: Number,
        default: 0
    },
    badges: {
        type: [String],
        default: [],
    },
})


export default mongoose.model("User", UserSchema);



// UserSchema.pre("save", async function (next) {
//     if(this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// })

// UserSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// }

