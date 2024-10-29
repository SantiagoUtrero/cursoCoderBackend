import multer from "multer";
import fs from "fs";
import path from "path";
import customErrors from '../errors/customErrors.js'

const ensureDirecotoriesExist = () => {
    const directories = ["public/uploads/profiles", "public/uploads/documents", "public/uploads/products"];

    directories.forEach( dir =>{
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true});
        }
    })
}

ensureDirecotoriesExist();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "profile") {
            cb(null, "./public/uploads/profiles");
        } else if (file.fieldname === "productImg") {
            cb(null, "./public/uploads/products");
        } else if (file.fieldname === "documents") {
            cb(null, "./public/uploads/documents");
        } else {
            cb(customErrors.badRequestError("Invalid fieldname"), null);
        }
    },
    filename: (req, file, cb) => {
        if (!req.user || !req.user._id) {
            return cb(customErrors.badRequestError("User ID is missing"), null);
        }
        const userId = req.user._id;
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);
        cb(null, `${basename}-${userId}${extension}`);
    },
});

export const upload = multer({ storage });