import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    age: Number,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "carts"},
    documents: [ { name: String, reference: String} ],
    Last_Connection: Date,
});

export const userModel = mongoose.model(userCollection, userSchema);