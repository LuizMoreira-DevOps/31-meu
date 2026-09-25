import Hero from "@/components/home/Hero";
import HomeSections from "@/components/home/HomeSections";
import BackToTop from "@/components/layout/BackToTop";

import { getSiteContent, getHomeContent } from "@/lib/content";
import { createWhatsAppUrl } from "@/lib/whatsapp";

import styles from "./page.module.css";

export default async function HomePage() {
    const [site, home] = await Promise.all([
        getSiteContent(),
        getHomeContent(),
    ]);
    const visitUrl = createWhatsAppUrl(
        site.contact.whatsapp,
        site.messages.scheduleVisit,
    );

    return (
        <div className={styles.home}>
            <main id="conteudo" tabIndex={-1}>
                <Hero hero={home.hero} />
                <HomeSections content={home} visitUrl={visitUrl} />
            </main>
            <div className={styles.floatingActions}>
                <a
                    className={styles.whatsappWidget}
                    href={visitUrl}
                    aria-label="Agendar uma visita pelo WhatsApp"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="30"
                        height="30"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.46 0 .1 5.35 .1 11.94c0 2.1 .55 4.16 1.6 5.97L0 24l6.25-1.64a11.96 11.96 0 0 0 5.79 1.48h.01c6.58 0 11.94-5.35 11.95-11.94a11.87 11.87 0 0 0-3.48-8.42ZM12.05 21.82a9.91 9.91 0 0 1-5.06-1.39l-.36-.21-3.71.97.99-3.62-.24-.37a9.9 9.9 0 0 1-1.52-5.26c0-5.48 4.46-9.94 9.94-9.94a9.87 9.87 0 0 1 7.03 2.92 9.87 9.87 0 0 1 2.91 7.03c0 5.48-4.46 9.94-9.98 9.87Z" />
                        <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.77-.73 2.02-1.44.25-.71.25-1.32.17-1.44-.07-.13-.27-.2-.57-.35Z" />
                    </svg>
                </a>
                <BackToTop className={styles.backToTop} />
            </div>
        </div>
    );
}
