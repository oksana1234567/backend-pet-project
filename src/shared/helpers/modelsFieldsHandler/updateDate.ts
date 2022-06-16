import Articles from "../../interfaces/article.interface";


export const updateDate = (model: Articles) => {
    return model.updatedAt = new Date().toString();
}