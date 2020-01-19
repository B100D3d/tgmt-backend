import resourceModel from "./MongoModels/resourceModel";

export const getResources = async () => {
    const dbRes: object[] = await resourceModel.find().exec();
    interface IRes {
        img: string;
        text: string;
        url: string;
    }
    const resources = dbRes.map(({img, text, url}: IRes) => ({img, text, url}));
    return resources;
};
