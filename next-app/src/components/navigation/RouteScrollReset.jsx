"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RouteScrollReset() {
    const pathname = usePathname();
    const previousPathname = useRef(pathname);

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        const previous = previousPathname.current;
        previousPathname.current = pathname;

        if (previous === pathname) {
            return;
        }

        /*
         * Navegação para uma seção da Home:
         * deixamos o fragmento controlar a posição.
         */
        if (window.location.hash) {
            return;
        }

        /*
         * Esperamos o App Router terminar a troca visual
         * antes de zerar a posição.
         */
        const firstFrame = window.requestAnimationFrame(() => {
            const secondFrame = window.requestAnimationFrame(() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "auto",
                });
            });

            return () => window.cancelAnimationFrame(secondFrame);
        });

        return () => window.cancelAnimationFrame(firstFrame);
    }, [pathname]);

    return null;
}
