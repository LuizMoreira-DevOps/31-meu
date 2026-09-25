"use client";

import { useEffect, useState } from "react";

export default function BackToTop({ className }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        function updateVisibility() {
            setIsVisible(window.scrollY > 0);
        }

        const frameId = window.requestAnimationFrame(updateVisibility);

        window.addEventListener("scroll", updateVisibility, {
            passive: true,
        });

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener("scroll", updateVisibility);
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <a
            className={className}
            href="#topo"
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
        >
            <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
            >
                <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
        </a>
    );
}
