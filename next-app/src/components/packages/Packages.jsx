import styles from "./Packages.module.css";

export default function PackagesOverview({ content, combos }) {
    return (
        <section className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>{content.title}</h1>

                <p className={styles.description}>{content.description}</p>

                <ul className={styles.list}>
                    {combos.map((combo) => (
                        <li key={combo.id} className={styles.card}>
                            <h2>{combo.title}</h2>

                            <p>{combo.description}</p>

                            <a
                                className={styles.link}
                                href={`/pacotes/${combo.slug}`}
                            >
                                Ver detalhes
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
