import { getPackagesContent } from "@/lib/content";
import PackagesOverview from "@/components/packages/Packages";

export default async function PackagesPage() {
    const content = await getPackagesContent();

    return (
        <main id="conteudo" tabIndex={-1}>
            <PackagesOverview content={content} />
        </main>
    );
}
