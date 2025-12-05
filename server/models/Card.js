import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true },
    email: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    contact: {type: Number, required: true},
    image: {type: String}
});

const Card = mongoose.model("Card", cardSchema);

export default Card;