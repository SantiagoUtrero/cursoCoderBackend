import mongoose from "mongoose";

const dbName = "ecommerce";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:123junio@e-commerce1.hwuxqrg.mongodb.net/${dbName}`);
        console.log("MongoDB conectado");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        throw error;
    }
};