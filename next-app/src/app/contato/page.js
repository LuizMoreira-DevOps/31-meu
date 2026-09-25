import Contact from "@/components/contact/Contact";
import { getSiteContent, getContactContent } from "@/lib/content";

export async function generateMetadata() {
    const [site, content] = await Promise.all([
        getSiteContent(),
        getContactContent(),
    ]);

    return {
        title: `${content.title} | ${site.brand.name}`,
        description: content.description,
    };
}

export default async function ContactPage() {
    const [site, content] = await Promise.all([
        getSiteContent(),
        getContactContent(),
    ]);

    return (
        <>
            <main id="conteudo" tabIndex={-1}>
                <Contact
                    content={content}
                    socialLinks={site.socialLinks}
                    phone={site.contact.whatsapp}
                />
            </main>
        </>
    );
}
