import Location from "@/components/location/Location";
import { getSiteContent, getLocationContent } from "@/lib/content";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export async function generateMetadata() {
    const [site, content] = await Promise.all([
        getSiteContent(),
        getLocationContent(),
    ]);

    return {
        title: `${content.title} | ${site.brand.name}`,
        description: content.description,
    };
}

export default async function LocationPage() {
    const [site, content] = await Promise.all([
        getSiteContent(),
        getLocationContent(),
    ]);

    const { coordinates } = site.location;

    const destination = `${coordinates.latitude},${coordinates.longitude}`;

    const mapParams = new URLSearchParams({
        q: destination,
        z: "18",
        output: "embed",
    });

    const directionsParams = new URLSearchParams({
        api: "1",
        destination,
    });

    const mapUrl = `https://www.google.com/maps?${mapParams}`;
    const directionsUrl = `https://www.google.com/maps/dir/?${directionsParams}`;

    const visitUrl = createWhatsAppUrl(
        site.contact.whatsapp,
        site.messages.scheduleVisit,
    );

    return (
        <>
            <main id="conteudo" tabIndex={-1}>
                <Location
                    content={content}
                    location={site.location}
                    mapUrl={mapUrl}
                    directionsUrl={directionsUrl}
                    visitUrl={visitUrl}
                />
            </main>
        </>
    );
}
