"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import styles from "./MainNav.module.css";

export default function MainNav({ navigation }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuId = useId();
    const buttonRef = useRef(null);

    function handleKeyDown(event) {
        if (event.key === "Escape" && isOpen) {
            setIsOpen(false);
            buttonRef.current?.focus();
        }
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

            <ul id={menuId} className={styles.list} data-open={isOpen}>
                {navigation.items.map((item) => (
                    <li key={item.id}>
                        <Link
                            className={styles.link}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
