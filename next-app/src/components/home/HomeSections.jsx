import Image from "next/image";
import styles from "./HomeSections.module.css";

function Icon({ name }) {
    const paths = {
        heart: "M12 20S3 14 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12-9 12Z",
        star: "m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1Z",
        balloon:
            "M12 17c-5 0-8-5-8-9a8 8 0 0 1 16 0c0 4-3 9-8 9Zm0 0-2 3h4Zm0 3v3",
        home: "m3 10 9-8 9 8M5 9v12h14V9M9 21v-8h6v8",
        smile: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM8 9h.01M16 9h.01M7 14q5 6 10 0",
        cake: "M3 12h18v9H3ZM3 16q3 4 6 0 3 4 6 0 3 4 6 0M8 12V8m8 4V8M8 5V3m8 2V3",
    };
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d={paths[name] || paths.star} />
        </svg>
    );
}

function Photo({ image, className, sizes }) {
    return (
        <Image
            className={className}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
        />
    );
}

export default function HomeSections({ content, visitUrl }) {
    const { benefits, space, differentials, testimonials, closing } = content;
    return (
        <>
            <section
                className={styles.benefits}
                aria-label={content.benefitsLabel}
            >
                <div className={styles.container}>
                    <ul className={styles.benefitGrid}>
                        {benefits.map((item) => (
                            <li key={item.id}>
                                <span
                                    className={`${styles.icon} ${styles[item.theme]}`}
                                >
                                    <Icon name={item.icon} />
                                </span>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section
                id="espaco"
                className={styles.space}
                aria-labelledby="space-title"
            >
                <div className={styles.container}>
                    <div className={styles.spaceCard}>
                        <Photo
                            image={space.image}
                            className={styles.spacePhoto}
                            sizes="(min-width: 1320px) 1200px, 92vw"
                        />
                        <div className={styles.spaceText}>
                            <p className={styles.eyebrow}>{space.eyebrow}</p>
                            <h2 id="space-title">{space.title}</h2>
                            <p>{space.description}</p>
                            <a className={styles.lightButton} href={visitUrl}>
                                {space.actionLabel}{" "}
                                <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section
                id="diferenciais"
                className={styles.differentials}
                aria-labelledby="differentials-title"
            >
                <div
                    className={`${styles.container} ${styles.differentialsGrid}`}
                >
                    <div>
                        <p className={styles.eyebrow}>
                            {differentials.eyebrow}
                        </p>
                        <h2 id="differentials-title">{differentials.title}</h2>
                        <ul className={styles.cards}>
                            {differentials.items.map((item) => (
                                <li key={item.id}>
                                    <span
                                        className={`${styles.icon} ${styles[item.theme]}`}
                                    >
                                        <Icon name={item.icon} />
                                    </span>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Photo
                        image={differentials.image}
                        className={styles.organicPhoto}
                        sizes="(min-width: 1320px) 400px, (min-width: 900px) 32vw, 90vw"
                    />
                </div>
            </section>
            <section
                id="depoimentos"
                className={styles.testimonials}
                aria-labelledby="testimonials-title"
            >
                <div
                    className={`${styles.container} ${styles.testimonialGrid}`}
                >
                    <div>
                        <p className={styles.eyebrow}>{testimonials.eyebrow}</p>
                        <h2 id="testimonials-title">{testimonials.title}</h2>
                        <p>{testimonials.description}</p>
                    </div>
                    <div className={styles.quotes}>
                        {testimonials.items.length ? (
                            testimonials.items.map((item) => (
                                <figure className={styles.quote} key={item.id}>
                                    {item.image && (
                                        <Photo
                                            image={item.image}
                                            className={styles.portrait}
                                            sizes="120px"
                                        />
                                    )}
                                    <div>
                                        <blockquote>
                                            <p>{item.quote}</p>
                                        </blockquote>
                                        <figcaption>
                                            <strong>{item.author}</strong>
                                            {item.detail && (
                                                <span>{item.detail}</span>
                                            )}
                                        </figcaption>
                                    </div>
                                </figure>
                            ))
                        ) : (
                            <div className={styles.quote}>
                                <p>{testimonials.emptyMessage}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className={styles.closing} aria-labelledby="closing-title">
                <div className={`${styles.container} ${styles.closingCard}`}>
                    <div className={styles.closingText}>
                        <h2 id="closing-title">{closing.title}</h2>
                        <p>{closing.description}</p>
                        <a className={styles.pinkButton} href={visitUrl}>
                            {closing.actionLabel}{" "}
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                    <Photo
                        image={closing.image}
                        className={styles.closingPhoto}
                        sizes="(min-width: 1320px) 600px, (min-width: 900px) 46vw, 92vw"
                    />
                </div>
            </section>
        </>
    );
}
