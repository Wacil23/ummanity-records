import Sidebar from "../components/ui/sidebar/Sidebar";
import { SessionProvider } from "next-auth/react";
import Header from "../components/ui/header/Header";
import SocialMedia from "../components/social-media/SocialMedia";
import ShopifyContextProvider from "../contexts/ShopifyContext";
import MetaContextProvider from "../contexts/MetaContext";

export const Home = async () => {
  return (
    <SessionProvider>
      <MetaContextProvider>
        <ShopifyContextProvider>
          <div className="w-full flex">
            <div className="hidden md:block">
              <Sidebar />
            </div>
            <div className="flex flex-col w-full">
              <Header />
              <div className="flex flex-col gap-4 p-8">
                <div className="flex flex-col gap-6">
                  <SocialMedia />
                </div>
              </div>
            </div>
          </div>
        </ShopifyContextProvider>
      </MetaContextProvider>
    </SessionProvider>
  );
};

export default Home;
