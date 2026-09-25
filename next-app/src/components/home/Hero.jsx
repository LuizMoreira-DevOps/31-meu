import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero({ hero }) {
    return (
        <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.photoFrame}>
                <Image
                    className={styles.photo}
                    src={hero.image.src}
                    alt={hero.image.alt}
                    fill
                    sizes="(min-width: 900px) 65vw, 100vw"
                    loading="eager"
                    fetchPriority="high"
                />
            </div>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 id="hero-title">
                        {hero.title.highlight} {hero.title.rest}
                    </h1>
                    <p>{hero.subtitle}</p>
                    <div className={styles.actions}>
                        <a
                            className={styles.primary}
                            href={hero.spaceAction.href}
                        >
                            {hero.spaceAction.label}
                            <span aria-hidden="true">→</span>
                        </a>
                        <Link
                            className={styles.secondary}
                            href={hero.packagesAction.href}
                        >
                            {hero.packagesAction.label}
                        </Link>
                    </div>
                </div>
            </div>
            <svg
                className={styles.wave}
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
            >
                <path d="M0 55 C110 110 180 -15 300 25 S470 80 590 35 S770 80 910 38 S1110 -10 1240 50 S1380 95 1440 60 V100 H0Z" />
            </svg>
        </section>
    );
}
