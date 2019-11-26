import resourceModel from './MongoModels/resourceModel';



export const getResources = async () => {
    const dbRes = await resourceModel.find().exec();
    const resources = dbRes.map(({img, text, url}) => ({img, text, url}));
    return resources;
}