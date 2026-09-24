import Image from "next/image";
import styles from "./Hero.module.css";
import Link from "next/link";

export default function Hero({ hero, visitUrl }) {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>
                        <span className={styles.titleHighlight}>
                            {hero.title.highlight}
                        </span>{" "}
                        <span className={styles.titleRest}>
                            {hero.title.rest}
                        </span>
                    </h1>
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
                <div className={styles.photoFrame}>
                    <Image
                        className={styles.photo}
                        src={hero.image.src}
                        alt={hero.image.alt}
                        width={hero.image.width}
                        height={hero.image.height}
                        sizes="
    (max-width: 599px) calc(100vw - 48px),
    (max-width: 899px) 92vw,
    (max-width: 1199px) calc(46vw - 12px),
    (max-width: 1599px) 53.4vw,
    (max-width: 1747px) calc(60vw - 105.6px),
    944px
"
                    />

                    <svg
                        className={styles.photoStar}
                        width="80"
                        height="80"
                        viewBox="0 0 100 100"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path
                            d="M49 7 61 35 92 32 70 55 80 87 50 71 23 91 28 58 6 39 38 35Z"
                            fill="var(--color-action-yellow)"
                            stroke="var(--color-heading)"
                            strokeWidth="3"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}
