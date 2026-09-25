import PackagesOverview from "@/components/packages/Packages";
import { getSiteContent, getPackagesContent } from "@/lib/content";

export async function generateMetadata() {
    const [site, content] = await Promise.all([
        getSiteContent(),
        getPackagesContent(),
    ]);

    return {
        title: `${content.title} | ${site.brand.name}`,
        description: content.description,
    };
}

export default async function PackagesPage() {
    const content = await getPackagesContent();

    return (
        <>
            <main id="conteudo" tabIndex={-1}>
                <PackagesOverview content={content} />
            </main>
        </>
    );
}
