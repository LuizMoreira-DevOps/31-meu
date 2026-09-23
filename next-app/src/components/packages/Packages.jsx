import styles from "./Packages.module.css";

export default function PackagesOverview({ content }) {
    return (
        <section className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>{content.title}</h1>
                <p className={styles.description}>{content.description}</p>

                <ul className={styles.list}>
                    {content.packages.map((item) => (
                        <li key={item.id} className={styles.card}>
                            <h2>{item.title}</h2>
                            <a className={styles.link} href={item.href}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <a
                    className={styles.link}
                    href={content.allPackagesAction.href}
                >
                    {content.allPackagesAction.label}
                </a>
            </div>
        </section>
    );
}
