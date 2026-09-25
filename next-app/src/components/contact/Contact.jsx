import ContactForm from "./ContactForm";
import styles from "./Contact.module.css";

export default function Contact({ content, socialLinks, phone }) {
    return (
        <div className={styles.contact}>
            <div className={styles.container}>
                <header className={styles.intro}>
                    <h1 className={styles.title}>{content.title}</h1>

                    <p className={styles.description}>{content.description}</p>
                </header>

                <nav
                    className={styles.socialNav}
                    aria-label={content.socialLabel}
                >
                    <ul className={styles.socialLinks}>
                        {socialLinks.map((social) => (
                            <li key={social.id}>
                                <a
                                    className={styles.socialLink}
                                    href={social.href}
                                >
                                    <span className={styles.socialName}>
                                        {social.label}
                                        <span aria-hidden="true"> ↗</span>
                                    </span>

                                    <span className={styles.socialHandle}>
                                        {social.handle}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <ContactForm content={content.form} phone={phone} />
            </div>
        </div>
    );
}
