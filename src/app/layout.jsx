import "./globals.css";
import { UserProvider } from "./Components/UserContext";

import Nav from "./Components/Nav";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`w-screen h-screen overflow-hidden bg-my_light`}
      >
        <main className="w-full h-full container mx-auto   bg-my_light overflow-y-scroll no_scrollbar ">
          <UserProvider>
            <Nav />
            {children}
          </UserProvider>
        </main>
      </body>
    </html>
  );
}
