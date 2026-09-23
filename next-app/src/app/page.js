import Hero from "@/components/home/Hero";
import Header from "@/components/layout/Header";

import styles from "./page.module.css";

import { getSiteContent, getHomeContent } from "@/lib/content";
import { createWhatsAppUrl } from "@/lib/whatsapp";

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
            <Header brand={site.brand} navigation={site.navigation} />

            <main id="conteudo" tabIndex={-1} className={styles.main}>
                <Hero hero={home.hero} visitUrl={visitUrl} />
            </main>
        </div>
    );
}
