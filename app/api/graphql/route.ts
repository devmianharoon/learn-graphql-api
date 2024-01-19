import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: number
}

let dummyProducts = [
  { "id": 1, "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15gfh Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "rating": 120 },
  { "id": 2, "title": "Fjalsertlraven - Foldsack No. 1 Backpack, Fits gfh15 Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "rating":  120 },
  { "id": 3, "title": "Fjalthlravefghgfn - Foldsack No. 1ffffh Backpack, Fits 15 Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "rating":  11}
]


const gql = String.raw;

const typeDefs = gql`
  type Query{
    getProducts:[Product]
  }
  type Product {
    id: ID
    title: String
    price: Float
    description: String
    category: String
    image: String
    rating: Int
  }
  type Mutation{
    createProduct(Product:productType):Product
  }

  input productType{
    id: ID
    title: String
    price: Float
    description: String
    category: String
    image: String
    rating: Int
  }


`;
const resolvers = {
  Query: {
    getProducts: () => {
      return dummyProducts
    }
  },
  Mutation: {
    createProduct: (root: {}, args: { Product: Product }, context: {}, info: {}) => {
      dummyProducts.push(args.Product)
      return args.Product;
    }
  }
};




const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server)
export { handler as GET, handler as POST };
