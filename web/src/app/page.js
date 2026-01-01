// 静态导出首页 - 重定向到 /product
import { redirect } from 'next/navigation';

export default function Home() {
    redirect('/product');
}
