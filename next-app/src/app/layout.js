import {
    Geist,
    Geist_Mono,
    Luckiest_Guy,
    Kalam,
    Fredoka,
} from "next/font/google";

import "@/css/global.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const luckiestGuy = Luckiest_Guy({
    variable: "--font-luckiest-guy",
    subsets: ["latin"],
    weight: "400",
    display: "swap",
});

const kalam = Kalam({
    variable: "--font-kalam",
    subsets: ["latin"],
    weight: "700",
    display: "swap",
});

const fredoka = Fredoka({
    variable: "--font-fredoka",
    subsets: ["latin"],
    weight: ["500", "600"],
    display: "swap",
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
            className={`${geistSans.variable} ${geistMono.variable} ${luckiestGuy.variable} ${kalam.variable} ${fredoka.variable}`}
        >
            <body>{children}</body>
        </html>
    );
}
