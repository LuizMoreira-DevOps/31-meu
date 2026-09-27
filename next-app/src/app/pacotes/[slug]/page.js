import { notFound } from "next/navigation";

import PackageDetails from "@/components/packages/PackageDetails";

import {
    getAddonsByIds,
    getComboBySlug,
    getCombosContent,
} from "@/lib/content";

export default async function PackageDetailsPage({ params }) {
    const { slug } = await params;

    const [combo, catalog] = await Promise.all([
        getComboBySlug(slug),
        getCombosContent(),
    ]);

    if (!combo) {
        notFound();
    }

    const [addons, includedAddons] = await Promise.all([
        getAddonsByIds(combo.addonIds),
        getAddonsByIds(combo.includedAddonIds),
    ]);

    return (
        <main id="conteudo" tabIndex={-1}>
            <PackageDetails
                combo={combo}
                addons={addons}
                includedAddons={includedAddons}
                sharedIncludes={catalog.sharedIncludes}
                guestPolicy={catalog.guestPolicy}
            />
        </main>
    );
}
