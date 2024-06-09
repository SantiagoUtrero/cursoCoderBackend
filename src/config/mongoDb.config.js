import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:123junio@e-commerce1.hwuxqrg.mongodb.net/ecommerce`);
        console.log("MongoDB conectado");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        throw error;
    }
};