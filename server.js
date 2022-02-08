const { ApolloServer, gql } = require('apollo-server');

require('dotenv').config();
const connect = require('./db/connect');
const authenticate = require('./auth');

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers/resolvers');

const main = async () => {
    try {
        connect(process.env.MONGO_URI);
        console.log("Connected to database successfully");

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: ({req, res}) => {
                return {authenticate, req};
            }
        });

        const serverInfo = await server.listen(process.env.PORT || 5000);
        console.log(`Server is up at ${serverInfo.url}`);

    } catch (error) {
        console.error('[ERROR]: ' + error);
    }
}

if (require.main === module)
    main();