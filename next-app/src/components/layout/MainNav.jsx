"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./MainNav.module.css";

export default function MainNav({ navigation }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuId = useId();
    const buttonRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        const desktop = window.matchMedia("(min-width: 900px)");
        function handleBreakpoint(event) {
            const active = document.activeElement;
            if (event.matches && active === buttonRef.current) {
                listRef.current?.querySelector("a")?.focus();
            } else if (!event.matches && listRef.current?.contains(active)) {
                buttonRef.current?.focus();
            }
            setIsOpen(false);
        }
        desktop.addEventListener("change", handleBreakpoint);
        return () => desktop.removeEventListener("change", handleBreakpoint);
    }, []);

    function handleKeyDown(event) {
        if (
            event.key !== "Escape" ||
            !isOpen ||
            window.matchMedia("(min-width: 900px)").matches
        )
            return;
        event.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
    }

    function handleNavigate(event) {
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        )
            return;
        if (!window.matchMedia("(min-width: 900px)").matches)
            buttonRef.current?.focus();
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
                <span aria-hidden="true">{isOpen ? "✕" : "☰"}</span>
                <span>
                    {isOpen ? navigation.closeLabel : navigation.openLabel}
                </span>
            </button>
            <ul
                ref={listRef}
                id={menuId}
                className={styles.list}
                data-open={isOpen}
            >
                {navigation.items.map((item) => (
                    <li key={item.id}>
                        <Link
                            className={styles.link}
                            href={item.href}
                            onClick={handleNavigate}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
