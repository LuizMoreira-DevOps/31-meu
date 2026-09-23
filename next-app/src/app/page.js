import Hero from "@/components/home/Hero";
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
        <main id="conteudo" tabIndex={-1}>
            <Hero hero={home.hero} visitUrl={visitUrl} />
        </main>
    );
}
