
import userServices from "../services/user.services.js";

const addDocuments = async (req, res, next) => {
    try {
        const {uid} = req.params;
        const files = req.files     
        const responseDocs = await userServices.addDocuments(uid, files);

    res.status(200).json({status: "ok", responseDocs});
    } catch (error) {
        error.path = "[GET] /api/user/:uid/documents";
        next(error);
    }
}

export default {
    addDocuments
}