import Hero from "@/components/home/Hero";
import Header from "@/components/layout/Header";
import HomeCombos from "@/components/home/HomeCombos";
import {
    getSiteContent,
    getHomeContent,
    getPackagesContent,
} from "@/lib/content";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import styles from "./page.module.css";

export default async function HomePage() {
    const [site, home, packagesContent] = await Promise.all([
        getSiteContent(),
        getHomeContent(),
        getPackagesContent(),
    ]);

    const visitUrl = createWhatsAppUrl(
        site.contact.whatsapp,
        site.messages.scheduleVisit,
    );

    const comboItems = home.combos.items.map((selection) => {
        const item = packagesContent.packages.find(
            (item) => item.id === selection.id,
        );

        if (!item) {
            throw new Error(`Combo da Home não encontrado: ${selection.id}`);
        }

        return {
            ...item,
            theme: selection.theme,
        };
    });

    return (
        <main id="conteudo" tabIndex={-1} className={styles.home}>
            <Header
                brand={site.brand}
                navigation={site.navigation}
                floatingBrand
            />

            <div className={styles.hero}>
                <Hero hero={home.hero} visitUrl={visitUrl} />
            </div>

            <HomeCombos title={home.combos.title} items={comboItems} />
        </main>
    );
}
