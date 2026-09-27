import PartyBuilder from "@/components/party-builder/PartyBuilder";
import {
    getComboBySlug,
    getCombosContent,
    getPartyBuilderContent,
    getSiteContent,
} from "@/lib/content";

export default async function PartyBuilderPage({ searchParams }) {
    const params = await searchParams;
    const comboSlug = typeof params?.combo === "string" ? params.combo : "";

    const [combo, catalog, content, site] = await Promise.all([
        getComboBySlug(comboSlug),
        getCombosContent(),
        getPartyBuilderContent(),
        getSiteContent(),
    ]);

    const initialComboSlug = combo?.slug ?? "";

    return (
        <main id="conteudo" tabIndex={-1}>
            <h1>{content.title}</h1>

            <PartyBuilder
                key={initialComboSlug}
                combos={catalog.combos}
                addons={catalog.addons}
                initialComboSlug={initialComboSlug}
                content={content.comboSelection}
                addonsContent={content.addons}
                summaryContent={content.summary}
                partyDetailsContent={content.partyDetails}
                phone={site.contact.whatsapp}
                whatsappContent={content.whatsapp}
            />
        </main>
    );
}
