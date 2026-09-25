import styles from "./Location.module.css";

export default function Location({
    content,
    location,
    mapUrl,
    directionsUrl,
    visitUrl,
}) {
    const { address } = location;

    return (
        <div className={styles.location}>
            <div className={styles.container}>
                <header className={styles.intro}>
                    <p className={styles.eyebrow}>{content.eyebrow}</p>

                    <h1 className={styles.title}>{content.title}</h1>

                    <p className={styles.description}>{content.description}</p>
                </header>

                <div className={styles.grid}>
                    <section
                        className={styles.mapSection}
                        aria-labelledby="location-map-title"
                    >
                        <h2 id="location-map-title">{content.map.title}</h2>

                        <p>{content.map.description}</p>

                        <div className={styles.mapFrame}>
                            <iframe
                                src={mapUrl}
                                title={content.map.frameTitle}
                                width="800"
                                height="480"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </section>

                    <section
                        className={styles.card}
                        aria-labelledby="location-details-title"
                    >
                        <h2 id="location-details-title">
                            {content.details.title}
                        </h2>

                        <div className={styles.info}>
                            <h3>{content.details.addressLabel}</h3>

                            <address className={styles.address}>
                                <span>
                                    {address.street}, {address.number}
                                </span>
                                <span>{address.neighborhood}</span>
                                <span>
                                    {address.city} — {address.state}
                                </span>
                                <span>{address.postalCode}</span>
                            </address>
                        </div>

                        <div className={styles.info}>
                            <h3>{content.details.hoursLabel}</h3>
                            <p>{location.openingHours}</p>
                        </div>

                        <div className={styles.actions}>
                            <a
                                className={styles.directionsButton}
                                href={directionsUrl}
                            >
                                {content.details.directionsLabel}
                                <span aria-hidden="true"> →</span>
                            </a>

                            <a className={styles.visitButton} href={visitUrl}>
                                {content.details.visitLabel}
                            </a>
                        </div>

                        <p className={styles.note}>{content.details.note}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
