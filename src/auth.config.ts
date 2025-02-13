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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/");
      if (isOnDashboard) {
        return isLoggedIn;
      }
      return true;
    },
    async signIn({ account, profile }) {
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
