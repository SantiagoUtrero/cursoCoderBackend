import userRepository from "../persistences/repositories/user.repository.js";



const addDocuments = async (uid, reqFiles) => {
    const files = reqFiles.documents;
    const userDocuments = files.map (file => {
        return{
            name: file.filename,
            reference: file.path
        }
    })

    const user = await userRepository.update(uid, { documents: userDocuments})
    return user;
}

export default{
    addDocuments
}