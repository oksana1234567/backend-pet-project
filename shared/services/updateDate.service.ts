interface IModel {
    updatedAt: any
}

export const updateDate = function (model: IModel) {
    return model.updatedAt = new Date();
}