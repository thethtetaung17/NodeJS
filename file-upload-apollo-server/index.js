const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { createWriteStream } = require('fs');
const multer = require('multer');
const path = require('path');
const helper = require('./utils/helper');
const cors = require('cors');

var upload = multer({ dest: './files/', fileFilter: helper.imageFilter });


const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    uploads: [File]
  }

  type Mutation {
    singleUpload(file: Upload!): Boolean!
  }
`;

const resolvers = {
    Query: {
        uploads: (parent, args) => { },
    },
    Mutation: {
        singleUpload: async (_, { file }) => {
            const { createReadStream, filename, mimetype, encoding } = await file;
            await new Promise(res =>
                createReadStream()
                    .pipe(
                        createWriteStream(path.join(__dirname, './images', filename))
                    )
                    .on('close', res)
            );
            return true;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const app = express();
app.use(cors());
app.use('/graphql', 
express.static(path.join(__dirname, './images')),
// upload.any()
);
server.applyMiddleware({app});

app.listen(3004, () => {
    console.log(`🚀 Server ready at http://localhost:3004/graphql`);
})
// server.listen().then(({ url }, ) => {
//     console.log(`🚀 Server ready at ${url}`);
// });