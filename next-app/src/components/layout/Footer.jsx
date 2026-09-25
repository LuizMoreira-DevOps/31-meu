import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer({ brand, navigation, content }) {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <Link
                    className={styles.brand}
                    href={brand.href}
                    aria-label={brand.homeLabel}
                >
                    {brand.name}
                </Link>

                <nav aria-label={content.navigationLabel}>
                    <ul className={styles.links}>
                        {navigation.items.map((item) => (
                            <li key={item.id}>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <p className={styles.text}>{content.text}</p>
            </div>
        </footer>
    );
}
