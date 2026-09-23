import Link from "next/link";
import MainNav from "./MainNav";
import styles from "./Header.module.css";

export default function Header({ brand, navigation }) {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link
                    className={styles.brand}
                    href={brand.href}
                    aria-label={brand.homeLabel}
                >
                    {brand.name}
                </Link>

                <MainNav navigation={navigation} />
            </div>
        </header>
    );
}
