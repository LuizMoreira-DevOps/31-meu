import { Geist, Geist_Mono } from "next/font/google";
import "@/css/global.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "31 Meu Buffet Infantil",
    description:
        "Buffet Infantil em Curitiba para festas, aniversários e momentos especiais.",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="pt-BR"
            className={`${geistSans.variable} ${geistMono.variable}`}
        >
            <body>{children}</body>
        </html>
    );
}
