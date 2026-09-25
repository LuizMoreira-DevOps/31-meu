import FAQ from "@/components/faq/FAQ";

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
            <main id="conteudo" tabIndex={-1}>
                <FAQ content={content} contactUrl={contactUrl} />
            </main>
        </>
    );
}
