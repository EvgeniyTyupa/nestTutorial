import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoString(configService),
        ...getMongoOptions()
    };
};

const getMongoString = (configService: ConfigService) => {
    return `mongodb+srv://${configService.get('MONGO_LOGIN')}:${configService.get('MONGO_PASSWORD')}@cluster0.mtpsg.mongodb.net/nest?retryWrites=true&w=majority`
}

const getMongoOptions = () => ({
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})