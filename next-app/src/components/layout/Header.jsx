"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import MainNav from "./MainNav";
import styles from "./Header.module.css";

export default function Header({ brand, navigation, contactAction }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const lastScrollY = useRef(0);
    const headerRef = useRef(null);

    function handleBrandClick(event) {
        setIsMenuOpen(false);

        if (window.location.pathname === "/") {
            event.preventDefault();

            window.history.replaceState(null, "", "/");

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto",
            });
        }
    }

    // Comportamento de esconder/revelar o Header
    useEffect(() => {
        let frameId = null;

        function updateHeader() {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY.current;

            setIsScrolled(currentScrollY > 24);

            if (currentScrollY < 160 || isMenuOpen) {
                setIsHidden(false);
            } else if (Math.abs(delta) > 8) {
                setIsHidden(delta > 0);
            }

            lastScrollY.current = currentScrollY;
            frameId = null;
        }

        function handleScroll() {
            if (frameId !== null) return;

            frameId = window.requestAnimationFrame(updateHeader);
        }

        lastScrollY.current = window.scrollY;
        updateHeader();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);

            if (frameId !== null) {
                window.cancelAnimationFrame(frameId);
            }
        };
    }, [isMenuOpen]);

    // Mede a altura real do Header para as âncoras
    useEffect(() => {
        const header = headerRef.current;

        if (!header) return;

        function updateHeaderHeight() {
            document.documentElement.style.setProperty(
                "--header-height",
                `${header.offsetHeight}px`,
            );
        }

        updateHeaderHeight();

        const observer = new ResizeObserver(updateHeaderHeight);

        observer.observe(header);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <header
            ref={headerRef}
            className={styles.header}
            data-scrolled={isScrolled}
            data-hidden={isHidden}
        >
            <div className={styles.container}>
                <Link
                    className={styles.brand}
                    href="/"
                    scroll={false}
                    aria-label={brand.homeLabel}
                    onClick={handleBrandClick}
                >
                    <Image
                        className={styles.logo}
                        src={brand.logo.src}
                        width={brand.logo.width}
                        height={brand.logo.height}
                        alt=""
                        sizes="(min-width: 1100px) 80px, 68px"
                    />
                </Link>

                <MainNav navigation={navigation} onOpenChange={setIsMenuOpen} />

                {contactAction && (
                    <Link
                        className={styles.contactPortal}
                        href={contactAction.href}
                        scroll={false}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {contactAction.label}
                        <span aria-hidden="true">→</span>
                    </Link>
                )}
            </div>
        </header>
    );
}
