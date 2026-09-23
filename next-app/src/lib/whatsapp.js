export function createWhatsAppUrl(phone, message) {
    const number = phone.replace(/\D/g, "");

    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
