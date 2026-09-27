"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import styles from "./MainNav.module.css";

const DESKTOP_BREAKPOINT = "(min-width: 1100px)";

export default function MainNav({ navigation, onOpenChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const menuId = useId();
    const buttonRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        const desktop = window.matchMedia(DESKTOP_BREAKPOINT);

        function handleBreakpoint(event) {
            const active = document.activeElement;

            if (event.matches && active === buttonRef.current) {
                listRef.current?.querySelector("a")?.focus({
                    preventScroll: true,
                });
            } else if (!event.matches && listRef.current?.contains(active)) {
                buttonRef.current?.focus({
                    preventScroll: true,
                });
            }

            setIsOpen(false);
        }

        desktop.addEventListener("change", handleBreakpoint);

        return () => {
            desktop.removeEventListener("change", handleBreakpoint);
        };
    }, []);

    useEffect(() => {
        onOpenChange?.(isOpen);
    }, [isOpen, onOpenChange]);

    function handleKeyDown(event) {
        if (
            event.key !== "Escape" ||
            !isOpen ||
            window.matchMedia(DESKTOP_BREAKPOINT).matches
        ) {
            return;
        }

        event.preventDefault();

        setIsOpen(false);

        buttonRef.current?.focus({
            preventScroll: true,
        });
    }

    function handleNavigate(event) {
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        if (!window.matchMedia(DESKTOP_BREAKPOINT).matches) {
            buttonRef.current?.focus({
                preventScroll: true,
            });
        }

        setIsOpen(false);
    }

    return (
        <nav
            className={styles.nav}
            aria-label={navigation.label}
            onKeyDown={handleKeyDown}
        >
            <button
                ref={buttonRef}
                className={styles.toggle}
                type="button"
                aria-expanded={isOpen}
                aria-controls={menuId}
                onClick={() => setIsOpen((previous) => !previous)}
            >
                <span>
                    {isOpen ? navigation.closeLabel : navigation.openLabel}
                </span>

                <span className={styles.toggleIcon} aria-hidden="true">
                    {isOpen ? "✕" : "☰"}
                </span>
            </button>

            <ul
                ref={listRef}
                id={menuId}
                className={styles.list}
                data-open={isOpen}
            >
                {navigation.items.map((item) => {
                    const isAnchorLink = item.href.includes("#");

                    return (
                        <li key={item.id}>
                            <Link
                                className={styles.link}
                                href={item.href}
                                scroll={isAnchorLink}
                                onClick={handleNavigate}
                            >
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
