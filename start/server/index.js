const { ApolloServer, gql } = require('apollo-server')
const { argsToArgsConfig } = require('graphql/type/definition')
const { mainCards, animals, categories } = require('./db')

const typeDefs = gql`
  type MainCard {
      title: String
      image: String
  }

  type Animal {
      id: ID!
      image: String!
      title: String!
      rating: Float
      price: String!
      description:[String!]!
      slug: String!
      stock: Int!
      onSale: Boolean  
      category: Category
  }

type Category {
    id: ID!
    image: String!
    category: String!
    slug: String!
    animals: [Animal!]!
}

  type Query {
    mainCards: [MainCard] 
    animals: [Animal]
    animal(slug: String!): Animal
    categories: [Category!]!
    category(slug: String!): Category
  }
  `

const resolvers = {
    Query: {
        mainCards: () => mainCards,
        animals: () => animals,
        animal: (parent, args, ctx) => {
            let animal = animals.find((animal) => {
                return animal.slug === args.slug
            })
            return animal
        },
        categories: () => categories,
        category: (parent, args, ctx) => {
            return category = categories.find((category) => {
                return category.slug === args.slug
            })
        }

    },
    Category: {
        animals: (parent, args, ctx) => {
            return animals.filter((animal) => {
                return animal.category === parent.id
            })
        }
    },
    Animal: {
        category: (parent, args, ctx) => {

            return categories.find((category) => {
                return category.id === parent.category
            })
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

01:39