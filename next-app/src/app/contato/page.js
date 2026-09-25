import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
            <Header brand={site.brand} navigation={site.navigation} />

            <main id="conteudo" tabIndex={-1}>
                <Contact
                    content={content}
                    socialLinks={site.socialLinks}
                    phone={site.contact.whatsapp}
                />
            </main>

            <Footer
                brand={site.brand}
                navigation={site.navigation}
                content={site.footer}
            />
        </>
    );
}
