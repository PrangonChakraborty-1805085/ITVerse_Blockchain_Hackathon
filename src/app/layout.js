import { Inter } from "next/font/google";
import "./globals.css";
import ReduxConnector from "../redux/ReduxConnector";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Art Block APP",
  description: "Generated by Nextjs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxConnector Children={children} />
      </body>
    </html>
  );
}
