// import { Inter } from "next/font/google";
import "./globals.css";
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "База данных города Перми",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="body">
        {children}
      </body>
    </html>
  );
}
