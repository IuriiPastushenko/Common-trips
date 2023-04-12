import * as dotenv from 'dotenv';
dotenv.config();

const mongoPath = `mongodb+srv://upas:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/@${process.env.MONGO_DB}?retryWrites=true&w=majority`;

export default mongoPath;
