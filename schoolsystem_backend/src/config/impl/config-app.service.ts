export class ConfigAppService {
    
    async getMongoConfig() {
        const mongoUrl: string = `${process.env.DATABASE_TYPE}://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?authSource=admin`
        return {
            uri: mongoUrl
        }
    }

}