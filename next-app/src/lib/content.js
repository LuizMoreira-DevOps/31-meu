import siteContent from "@/content/site.json";
import homeContent from "@/content/pages/home.json";
import packagesContent from "@/content/pages/pacotes.json";

export async function getSiteContent() {
    return siteContent;
}

export async function getHomeContent() {
    return homeContent;
}

export async function getPackagesContent() {
    return packagesContent;
}
