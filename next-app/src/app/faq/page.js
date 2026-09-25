import Header from "@/components/layout/Header";
import FAQ from "@/components/faq/FAQ";
import Footer from "@/components/layout/Footer";

import { getSiteContent, getFaqContent } from "@/lib/content";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export async function generateMetadata() {
    const [site, content] = await Promise.all([
        getSiteContent(),
        getFaqContent(),
    ]);

    return {
        title: `${content.title} | ${site.brand.name}`,
        description: content.description,
    };
}

export default async function FAQPage() {
    const [site, content] = await Promise.all([
        getSiteContent(),
        getFaqContent(),
    ]);

    const contactUrl = createWhatsAppUrl(
        site.contact.whatsapp,
        content.support.contactMessage,
    );

    return (
        <>
            <Header brand={site.brand} navigation={site.navigation} />

            <main id="conteudo" tabIndex={-1}>
                <FAQ content={content} contactUrl={contactUrl} />
            </main>

            <Footer
                brand={site.brand}
                navigation={site.navigation}
                content={site.footer}
            />
        </>
    );
}
