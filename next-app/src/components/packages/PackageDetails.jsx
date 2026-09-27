import Link from "next/link";

import styles from "./PackageDetails.module.css";

export default function PackageDetails({
    combo,
    addons,
    includedAddons,
    sharedIncludes,
    guestPolicy,
}) {
    return (
        <article className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>{combo.eyebrow}</p>

                    <h1 className={styles.title}>{combo.title}</h1>

                    <p className={styles.description}>{combo.description}</p>

                    <ul className={styles.highlights}>
                        {combo.highlights.map((highlight) => (
                            <li key={highlight} className={styles.highlight}>
                                {highlight}
                            </li>
                        ))}
                    </ul>
                    <Link
                        className={styles.builderAction}
                        href={`/criar-festa?combo=${combo.slug}`}
                    >
                        Montar com este combo
                    </Link>
                </header>

                <div className={styles.grid}>
                    <section className={styles.section}>
                        <h2>{combo.gastronomy.title}</h2>

                        <ul>
                            {combo.gastronomy.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>{combo.decoration.title}</h2>

                        <ul>
                            {combo.decoration.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>{sharedIncludes.structure.title}</h2>

                        <ul>
                            {sharedIncludes.structure.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>{sharedIncludes.team.title}</h2>

                        <ul>
                            {sharedIncludes.team.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    {includedAddons.length > 0 && (
                        <section
                            className={`${styles.section} ${styles.included}`}
                        >
                            <h2>Também incluído neste combo</h2>

                            <ul>
                                {includedAddons.map((addon) => (
                                    <li key={addon.id}>{addon.label}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {addons.length > 0 && (
                        <section
                            className={`${styles.section} ${styles.addons}`}
                        >
                            <h2>Opcionais disponíveis</h2>

                            <ul>
                                {addons.map((addon) => (
                                    <li key={addon.id}>{addon.label}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                <div className={styles.footerGrid}>
                    <section className={styles.section}>
                        <h2>Informações da festa</h2>

                        <ul>
                            {combo.eventInfo.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>{guestPolicy.title}</h2>

                        <ul>
                            {guestPolicy.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </article>
    );
}
