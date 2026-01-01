// 根布局 - 静态导出版本
import {Inter} from 'next/font/google';
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'B2B Website',
  description: 'A professional B2B website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
