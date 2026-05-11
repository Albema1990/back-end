import CategoryType from "../models/CategoryType.js";

export const createCategoryType = async (req, res) => {
    const categoryType = new CategoryType(req.body);

    await categoryType.save();

    res.status(201).json(categoryType);
};