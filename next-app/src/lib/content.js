import siteContent from "@/content/site.json";
import homeContent from "@/content/pages/home.json";
import packagesContent from "@/content/pages/pacotes.json";
import faqContent from "@/content/pages/faq.json";

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
