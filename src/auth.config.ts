import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.picture = profile.picture;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("token", token);
      session.user.image = token.picture;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/");
      if (isOnDashboard) {
        return isLoggedIn;
      }
      return true;
    },
    async signIn({ account, profile }) {
      console.log("progile ", profile);
      if (account?.provider === "google") {
        if (
          profile?.email_verified &&
          profile.email &&
          profile.email.endsWith("@ummanitymedia.fr")
        ) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
});
