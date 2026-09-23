import Header from "@/components/layout/Header";
import PackagesOverview from "@/components/packages/Packages";
import { getSiteContent, getPackagesContent } from "@/lib/content";

export default async function PackagesPage() {
    const [site, content] = await Promise.all([
        getSiteContent(),
        getPackagesContent(),
    ]);

    return (
        <>
            <Header brand={site.brand} navigation={site.navigation} />

            <main id="conteudo" tabIndex={-1}>
                <PackagesOverview content={content} />
            </main>
        </>
    );
}
