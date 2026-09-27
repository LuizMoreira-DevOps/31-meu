import siteContent from "@/content/site.json";
import combosContent from "@/content/combos.json";

import homeContent from "@/content/pages/home.json";
import packagesContent from "@/content/pages/pacotes.json";
import faqContent from "@/content/pages/faq.json";
import locationContent from "@/content/pages/localizacao.json";
import contactContent from "@/content/pages/contato.json";
import partyBuilderContent from "@/content/pages/criar-festa.json";

export async function getSiteContent() {
    return siteContent;
}

export async function getHomeContent() {
    return homeContent;
}

export async function getPackagesContent() {
    return packagesContent;
}

export async function getFaqContent() {
    return faqContent;
}

export async function getLocationContent() {
    return locationContent;
}

export async function getContactContent() {
    return contactContent;
}

export async function getCombosContent() {
    return combosContent;
}

export async function getComboBySlug(slug) {
    const content = await getCombosContent();

    return content.combos.find((combo) => combo.slug === slug) ?? null;
}

export async function getAddonsByIds(ids = []) {
    const content = await getCombosContent();

    return ids
        .map((id) => content.addons.find((addon) => addon.id === id))
        .filter(Boolean);
}

export async function getPartyBuilderContent() {
    return partyBuilderContent;
}
