import siteContent from "@/content/site.json";
import homeContent from "@/content/pages/home.json";

export async function getSiteContent() {
    return siteContent;
}

export async function getHomeContent() {
    return homeContent;
}
