export function getPartyReviewMessages({
    combo,
    adultsCount,
    childrenCount,
    partyDate,
}) {
    const rules = combo?.reviewRules;

    if (!rules) {
        return [];
    }

    const messages = [];

    const quantities = [
        { value: adultsCount, rule: rules.adults },
        { value: childrenCount, rule: rules.children },
    ];

    for (const { value, rule } of quantities) {
        if (!rule || value === "") {
            continue;
        }

        const quantity = Number(value);

        if (
            Number.isInteger(quantity) &&
            quantity >= 0 &&
            quantity > rule.above
        ) {
            messages.push(rule.message);
        }
    }

    if (partyDate && rules.weekdays) {
        const date = new Date(`${partyDate}T00:00:00Z`);
        const weekday = date.getUTCDay();

        if (
            !Number.isNaN(weekday) &&
            !rules.weekdays.allowed.includes(weekday)
        ) {
            messages.push(rules.weekdays.message);
        }
    }

    return messages;
}
