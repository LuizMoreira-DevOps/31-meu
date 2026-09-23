import Image from "next/image";
import styles from "./Hero.module.css";
import Link from "next/link";

export default function Hero({ hero, visitUrl }) {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>{hero.title}</h1>
                    <p>{hero.subtitle}</p>
                    <div className={styles.actions}>
                        <a className={styles.visitButton} href={visitUrl}>
                            {hero.visitLabel}
                        </a>

                        <Link
                            className={styles.packagesButton}
                            href={hero.packagesAction.href}
                        >
                            {hero.packagesAction.label}
                        </Link>
                    </div>
                </div>

                <Image
                    className={styles.photo}
                    src={hero.image.src}
                    alt={hero.image.alt}
                    width={hero.image.width}
                    height={hero.image.height}
                    sizes="(max-width: 899px) calc(100vw - 48px), (max-width: 1668px) calc((100vw - 72px) / 2), 798px"
                />
            </div>
        </section>
    );
}
