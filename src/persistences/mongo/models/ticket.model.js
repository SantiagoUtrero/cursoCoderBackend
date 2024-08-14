import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_datatime: {
        type: Date,
        default: Date.now()
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true
    }
})

ticketSchema.plugin(mongoosePaginate);

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);