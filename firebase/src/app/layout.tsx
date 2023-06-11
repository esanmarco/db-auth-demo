import { AuthContextProvider } from "./(base)/components/FirebaseProvider";
import QueryProvider from "./(shared)/QueryProvider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <AuthContextProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
