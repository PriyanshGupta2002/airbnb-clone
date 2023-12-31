import NextAuth,{AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import client from "@/app/libs/prismadb";

export const authOptions : AuthOptions={
  adapter: PrismaAdapter(client),
  providers: [
   GithubProvider({
    clientId:process.env.GITHUB_ID as string,
    clientSecret:process.env.GITHUB_SECRET as string
   }),
   GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
  CredentialProvider({
    name:"Credentials",
    credentials: {
      email:{label:'email',type:'text'},
      password:{label:'password',type:'password'}
    },
    async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials")
        }
        const user = await client.user.findUnique({
          where:{
            email:credentials.email
          }
        })
        if (!user || !user.hashedPassword) {
          throw new Error("Invalid Credentials")
        }
        const isCorrectPassword = await bcrypt.compare(credentials.password
          ,user.hashedPassword)
        if (!isCorrectPassword) {
          throw new Error("Invalid Credentials")
        }
        return user
    },
  })
  ],
  pages:{
    signIn:'/'
  },
  debug:process.env.NODE_ENV==="development",
  session:{
    strategy:"jwt"
  },
  secret:process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }