import Link from "next/link";
import Image from "next/image";
import MainNav from "./MainNav";
import styles from "./Header.module.css";

export default function Header({ brand, navigation, floatingBrand = false }) {
    return (
        <header
            className={`${styles.header} ${floatingBrand ? styles.floatingBrand : ""}`}
        >
            <div className={styles.container}>
                <Link
                    className={styles.brand}
                    href={brand.href}
                    aria-label={brand.homeLabel}
                >
                    <Image
                        className={styles.logo}
                        src={brand.logo.src}
                        width={brand.logo.width}
                        height={brand.logo.height}
                        alt=""
                        sizes="(min-width: 900px) 96px, 80px"
                    />
                </Link>

                <MainNav navigation={navigation} />
            </div>
        </header>
    );
}
