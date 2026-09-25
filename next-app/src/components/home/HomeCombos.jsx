import styles from "./HomeCombos.module.css";

const themeClasses = {
    yellow: styles.yellow,
    coral: styles.coral,
    turquoise: styles.turquoise,
};

const comboIllustrations = {
    escolar: (
        <>
            <path d="M24 19v-4a8 8 0 0 1 16 0v4" />
            <path d="M20 19Q32 15 44 19L49 51Q32 56 15 51Z" />
            <rect x="23" y="34" width="18" height="14" rx="4" />
            <path d="M24 27h16M28 39h8M10 22l-5-3M53 22l5-4" />
        </>
    ),
    pocket: (
        <>
            <path d="M7 26 57 8 40 54 29 35Z" />
            <path d="M29 35 57 8M29 35l-3 15 9-8" />
            <path d="M19 43C5 42 5 55 17 56" strokeDasharray="4 5" />
        </>
    ),
    premium: (
        <>
            <path
                d="m12 21 11 10 9-20 10 20 11-12-6 32H17Z"
                fill="var(--color-action-yellow)"
                stroke="var(--color-heading)"
            />
            <path d="M19 44h26M7 9v8M3 13h8M55 5v8M51 9h8" />
        </>
    ),
};

export default function HomeCombos({ title, items }) {
    return (
        <section className={styles.section} aria-labelledby="home-combos-title">
            <div className={styles.container}>
                <h2 id="home-combos-title" className={styles.title}>
                    {title}
                </h2>

                <ul className={styles.list}>
                    {items.map((item) => (
                        <li key={item.id} className={styles.item}>
                            <a
                                className={`${styles.card} ${themeClasses[item.theme]}`}
                                href={item.href}
                            >
                                <svg
                                    className={styles.illustration}
                                    width="72"
                                    height="72"
                                    viewBox="0 0 64 64"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    {comboIllustrations[item.id]}
                                </svg>
                                <h3 className={styles.cardTitle}>
                                    {item.title}
                                </h3>

                                <span className={styles.cardAction}>
                                    {item.label}
                                    <span aria-hidden="true">→</span>
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
