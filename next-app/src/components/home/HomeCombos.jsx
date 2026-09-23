import styles from "./HomeCombos.module.css";

const themeClasses = {
    yellow: styles.yellow,
    coral: styles.coral,
    turquoise: styles.turquoise,
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
