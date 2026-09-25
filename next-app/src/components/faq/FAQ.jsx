import Link from "next/link";
import styles from "./FAQ.module.css";

export default function FAQ({ content, contactUrl }) {
    return (
        <section id="faq" className={styles.faq} aria-labelledby="faq-title">
            <div className={styles.container}>
                <div className={styles.intro}>
                    <p className={styles.eyebrow}>{content.eyebrow}</p>

                    <h1 id="faq-title" className={styles.title}>
                        {content.title}
                    </h1>

                    <p className={styles.description}>{content.description}</p>
                </div>

                <div className={styles.questions}>
                    {content.items.map((item) => (
                        <details key={item.id} className={styles.item}>
                            <summary className={styles.question}>
                                <span>{item.question}</span>

                                <span
                                    className={styles.indicator}
                                    aria-hidden="true"
                                />
                            </summary>

                            <div className={styles.answer}>
                                <p>{item.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>

                <div className={styles.support}>
                    <div>
                        <h2>{content.support.title}</h2>
                        <p>{content.support.description}</p>
                    </div>

                    <div className={styles.actions}>
                        <Link
                            className={styles.packagesLink}
                            href={content.support.packagesAction.href}
                        >
                            {content.support.packagesAction.label}
                        </Link>

                        <a className={styles.contactButton} href={contactUrl}>
                            {content.support.contactLabel}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
