import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.css";

export default function Footer({
    brand,
    content,
    socialLinks,
    location,
    contactUrl,
}) {
    const { address } = location;
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brandBlock}>
                    <Link
                        className={styles.brand}
                        href={brand.href}
                        aria-label={brand.homeLabel}
                    >
                        <Image
                            className={styles.logo}
                            src={brand.logo.src}
                            width={brand.logo.width}
                            height={brand.logo.height}
                            sizes="120px"
                            alt=""
                        />
                    </Link>

                    <p className={styles.tagline}>{content.tagline}</p>
                </div>

                <nav aria-label={content.navigationLabel}>
                    <h2 className={styles.columnTitle}>
                        {content.navigationTitle}
                    </h2>

                    <ul className={styles.links}>
                        {content.navigation.map((item) => (
                            <li key={item.id}>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <h2 className={styles.columnTitle}>
                        {content.contactTitle}
                    </h2>

                    <ul className={styles.links}>
                        <li>
                            <a href={contactUrl}>{content.whatsappLabel}</a>
                        </li>

                        {socialLinks.map((social) => (
                            <li key={social.id}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {social.label}
                                    <span
                                        className={styles.externalIcon}
                                        aria-hidden="true"
                                    >
                                        ↗
                                    </span>
                                </a>
                            </li>
                        ))}

                        <li>
                            <Link href="/contato">{content.contactLabel}</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className={styles.columnTitle}>
                        {content.locationTitle}
                    </h2>

                    <address className={styles.address}>
                        <span>
                            {address.street}, {address.number}
                        </span>

                        <span>{address.neighborhood}</span>

                        <span>
                            {address.city} · {address.state}
                        </span>
                    </address>

                    <Link className={styles.locationLink} href="/localizacao">
                        {content.locationLabel}
                        <span aria-hidden="true"> →</span>
                    </Link>
                </div>
            </div>

            <div className={styles.legal}>
                <div className={styles.legalInner}>
                    <p>
                        © {currentYear} {content.copyrightText}
                    </p>
                </div>
            </div>
        </footer>
    );
}
