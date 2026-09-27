"use client";

import { useRef, useState } from "react";

import styles from "./PartyBuilder.module.css";

import { createWhatsAppUrl } from "@/lib/whatsapp";

import { getPartyReviewMessages } from "@/lib/party-builder";

function getPartyDateValidation(input) {
    const now = new Date();

    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

    const selectedDate = input.valueAsNumber;

    const isPast = Number.isFinite(selectedDate) && selectedDate < today;

    return {
        isPast,
        invalid: !input.validity.valid || isPast,
    };
}

function formatPartyDate(value) {
    return value.split("-").reverse().join("/");
}

export default function PartyBuilder({
    combos,
    addons,
    initialComboSlug,
    content,
    addonsContent,
    summaryContent,
    partyDetailsContent,
    whatsappContent,
    phone,
}) {
    const [observations, setObservations] = useState("");

    const [birthdayName, setBirthdayName] = useState("");

    const [birthdayAge, setBirthdayAge] = useState("");

    const [birthdayAgeInvalid, setBirthdayAgeInvalid] = useState(false);

    const [adultsCount, setAdultsCount] = useState("");

    const [childrenCount, setChildrenCount] = useState("");

    const [requesterName, setRequesterName] = useState("");

    const [requesterNameTouched, setRequesterNameTouched] = useState(false);

    const [comboTouched, setComboTouched] = useState(false);

    const [childrenInvalid, setChildrenInvalid] = useState(false);

    const [adultsInvalid, setAdultsInvalid] = useState(false);

    const [partyDate, setPartyDate] = useState("");

    const [partyDateInvalid, setPartyDateInvalid] = useState(false);

    const [partyDatePast, setPartyDatePast] = useState(false);

    const partyDateRef = useRef(null);

    const [selectedAddonIds, setSelectedAddonIds] = useState([]);

    const [comboChangeMessages, setComboChangeMessages] = useState([]);

    const [selectedComboSlug, setSelectedComboSlug] =
        useState(initialComboSlug);

    const requesterNameInvalid = requesterName.trim() === "";

    const showRequesterNameError = requesterNameTouched && requesterNameInvalid;

    const selectedCombo = combos.find(
        (combo) => combo.slug === selectedComboSlug,
    );

    const comboInvalid = !selectedCombo;

    const showComboError = comboTouched && comboInvalid;

    const includedAddonIds = selectedCombo?.includedAddonIds ?? [];

    const availableAddons = addons.filter(
        (addon) =>
            selectedCombo?.addonIds.includes(addon.id) ||
            includedAddonIds.includes(addon.id),
    );

    const summaryAddons = availableAddons.filter(
        (addon) =>
            includedAddonIds.includes(addon.id) ||
            selectedAddonIds.includes(addon.id),
    );

    const reviewMessages = getPartyReviewMessages({
        combo: selectedCombo,
        adultsCount: adultsInvalid ? "" : adultsCount,
        childrenCount: childrenInvalid ? "" : childrenCount,
        partyDate: partyDateInvalid ? "" : partyDate,
    });

    function handleAdultsChange(event) {
        const input = event.target;

        setAdultsCount(input.value);
        setAdultsInvalid(!input.validity.valid);
    }

    function handleChildrenChange(event) {
        const input = event.target;

        setChildrenCount(input.value);
        setChildrenInvalid(!input.validity.valid);
    }

    function handleBirthdayAgeChange(event) {
        const input = event.target;

        setBirthdayAge(input.value);
        setBirthdayAgeInvalid(!input.validity.valid);
    }

    function handlePartyDateChange(event) {
        const input = event.target;
        const validation = getPartyDateValidation(input);

        setPartyDate(input.value);
        setPartyDatePast(validation.isPast);
        setPartyDateInvalid(validation.invalid);
    }

    function clearPartyDate() {
        if (partyDateRef.current) {
            partyDateRef.current.value = "";
            partyDateRef.current.focus();
        }

        setPartyDate("");
        setPartyDateInvalid(false);
        setPartyDatePast(false);
    }

    function handleAddonChange(addonId, checked) {
        setSelectedAddonIds((currentIds) =>
            checked
                ? [...currentIds, addonId]
                : currentIds.filter((id) => id !== addonId),
        );
    }

    function handleComboChange(comboSlug) {
        const nextCombo = combos.find((combo) => combo.slug === comboSlug);
        const nextOptionalIds = nextCombo?.addonIds ?? [];
        const nextIncludedIds = nextCombo?.includedAddonIds ?? [];

        const newlyIncluded = addons.filter(
            (addon) =>
                nextIncludedIds.includes(addon.id) &&
                !includedAddonIds.includes(addon.id),
        );

        const newlyOptional = addons.filter(
            (addon) =>
                includedAddonIds.includes(addon.id) &&
                nextOptionalIds.includes(addon.id) &&
                !nextIncludedIds.includes(addon.id),
        );

        const removed = summaryAddons.filter(
            (addon) =>
                !nextOptionalIds.includes(addon.id) &&
                !nextIncludedIds.includes(addon.id),
        );

        const messages = [];

        if (newlyIncluded.length > 0) {
            messages.push(
                `${addonsContent.nowIncludedMessage} ${newlyIncluded
                    .map((addon) => addon.label)
                    .join(", ")}.`,
            );
        }

        if (newlyOptional.length > 0) {
            messages.push(
                `${addonsContent.nowOptionalMessage} ${newlyOptional
                    .map((addon) => addon.label)
                    .join(", ")}.`,
            );
        }

        if (removed.length > 0) {
            messages.push(
                `${addonsContent.removedMessage} ${removed
                    .map((addon) => addon.label)
                    .join(", ")}.`,
            );
        }

        setSelectedComboSlug(comboSlug);

        setSelectedAddonIds((currentIds) =>
            currentIds.filter(
                (id) =>
                    nextOptionalIds.includes(id) &&
                    !nextIncludedIds.includes(id),
            ),
        );

        setComboChangeMessages(messages);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;

        const comboInput = form.elements.namedItem("combo");
        const requesterInput = form.elements.namedItem("requesterName");
        const dateInput = form.elements.namedItem("partyDate");
        const adultsInput = form.elements.namedItem("adultsCount");
        const childrenInput = form.elements.namedItem("childrenCount");
        const birthdayAgeInput = form.elements.namedItem("birthdayAge");

        setComboTouched(true);
        setRequesterNameTouched(true);

        const dateValidation = getPartyDateValidation(dateInput);

        const nextAdultsInvalid = !adultsInput.validity.valid;
        const nextChildrenInvalid = !childrenInput.validity.valid;
        const nextBirthdayAgeInvalid = !birthdayAgeInput.validity.valid;

        const finalReviewMessages = getPartyReviewMessages({
            combo: selectedCombo,
            adultsCount: nextAdultsInvalid ? "" : adultsCount,
            childrenCount: nextChildrenInvalid ? "" : childrenCount,
            partyDate: dateValidation.invalid ? "" : partyDate,
        });

        setPartyDateInvalid(dateValidation.invalid);
        setPartyDatePast(dateValidation.isPast);
        setAdultsInvalid(nextAdultsInvalid);
        setChildrenInvalid(nextChildrenInvalid);
        setBirthdayAgeInvalid(nextBirthdayAgeInvalid);

        const validationOrder = [
            {
                element: comboInput,
                invalid: !selectedCombo,
            },
            {
                element: requesterInput,
                invalid: requesterName.trim() === "",
            },
            {
                element: dateInput,
                invalid: dateValidation.invalid,
            },
            {
                element: adultsInput,
                invalid: nextAdultsInvalid,
            },
            {
                element: childrenInput,
                invalid: nextChildrenInvalid,
            },
            {
                element: birthdayAgeInput,
                invalid: nextBirthdayAgeInvalid,
            },
        ];

        const firstInvalidField = validationOrder.find(
            ({ invalid }) => invalid,
        );

        if (firstInvalidField) {
            firstInvalidField.element?.focus();
            return;
        }

        const includedAddons = summaryAddons.filter((addon) =>
            includedAddonIds.includes(addon.id),
        );

        const selectedOptionalAddons = summaryAddons.filter(
            (addon) =>
                selectedAddonIds.includes(addon.id) &&
                !includedAddonIds.includes(addon.id),
        );

        const lines = [
            whatsappContent.messageIntro,
            "",
            `${partyDetailsContent.requesterNameSummaryLabel} ${requesterName.trim()}`,
            `${whatsappContent.comboLabel} ${selectedCombo.title}`,
            `${partyDetailsContent.dateSummaryLabel} ${
                partyDate
                    ? formatPartyDate(partyDate)
                    : partyDetailsContent.dateUnknownLabel
            }`,
            `${partyDetailsContent.adultsSummaryLabel} ${
                adultsCount === ""
                    ? partyDetailsContent.quantityUnknownLabel
                    : adultsCount
            }`,
            `${partyDetailsContent.childrenSummaryLabel} ${
                childrenCount === ""
                    ? partyDetailsContent.quantityUnknownLabel
                    : childrenCount
            }`,
        ];

        if (birthdayName.trim()) {
            lines.push(
                `${partyDetailsContent.birthdayNameSummaryLabel} ${birthdayName.trim()}`,
            );
        }

        if (birthdayAge !== "") {
            lines.push(
                `${partyDetailsContent.birthdayAgeSummaryLabel} ${birthdayAge}`,
            );
        }

        if (includedAddons.length > 0) {
            lines.push(
                "",
                whatsappContent.includedTitle,
                ...includedAddons.map((addon) => `• ${addon.label}`),
            );
        }

        lines.push("", whatsappContent.selectedAddonsTitle);

        if (selectedOptionalAddons.length > 0) {
            lines.push(
                ...selectedOptionalAddons.map((addon) => `• ${addon.label}`),
            );
        } else {
            lines.push(whatsappContent.noAddonsLabel);
        }

        if (observations.trim()) {
            lines.push(
                "",
                partyDetailsContent.observationsSummaryLabel,
                observations.trim(),
            );
        }

        if (finalReviewMessages.length > 0) {
            lines.push(
                "",
                whatsappContent.reviewTitle,
                ...finalReviewMessages.map((message) => `• ${message}`),
            );
        }

        lines.push("", summaryContent.commercialNotice);

        const url = createWhatsAppUrl(phone, lines.join("\n"));

        window.location.assign(url);
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="party-combo">{content.label}</label>

            <select
                id="party-combo"
                name="combo"
                required
                value={selectedComboSlug}
                onChange={(event) => handleComboChange(event.target.value)}
                onBlur={() => setComboTouched(true)}
                aria-invalid={showComboError}
                aria-describedby={
                    showComboError ? "party-combo-error" : undefined
                }
            >
                <option value="">{content.placeholder}</option>

                {combos.map((combo) => (
                    <option key={combo.slug} value={combo.slug}>
                        {combo.title}
                    </option>
                ))}
            </select>

            <div aria-live="polite">
                {showComboError && (
                    <p id="party-combo-error">{content.requiredMessage}</p>
                )}
            </div>

            <p aria-live="polite">
                {selectedCombo
                    ? `${content.selectedLabel} ${selectedCombo.title}`
                    : content.emptyMessage}
            </p>
            <div role="status">
                {comboChangeMessages.map((message) => (
                    <p key={message}>{message}</p>
                ))}
            </div>
            <div>
                <label htmlFor="party-requester-name">
                    {partyDetailsContent.requesterNameLabel}
                </label>

                <input
                    id="party-requester-name"
                    name="requesterName"
                    type="text"
                    autoComplete="name"
                    required
                    value={requesterName}
                    onChange={(event) => setRequesterName(event.target.value)}
                    onBlur={() => setRequesterNameTouched(true)}
                    aria-invalid={showRequesterNameError}
                    aria-describedby={
                        showRequesterNameError
                            ? "party-requester-name-error"
                            : undefined
                    }
                />

                <div aria-live="polite">
                    {showRequesterNameError && (
                        <p id="party-requester-name-error">
                            {partyDetailsContent.requesterNameRequiredMessage}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="party-date">
                    {partyDetailsContent.dateLabel}
                </label>

                <input
                    ref={partyDateRef}
                    id="party-date"
                    name="partyDate"
                    type="date"
                    value={partyDate}
                    onChange={handlePartyDateChange}
                    onBlur={handlePartyDateChange}
                    aria-invalid={partyDateInvalid}
                    aria-describedby="party-date-status"
                />

                <div aria-live="polite">
                    <p id="party-date-status">
                        {partyDatePast
                            ? partyDetailsContent.datePastMessage
                            : partyDateInvalid
                              ? partyDetailsContent.dateInvalidMessage
                              : !partyDate
                                ? partyDetailsContent.dateUnknownLabel
                                : ""}
                    </p>
                </div>

                {(partyDate || partyDateInvalid) && (
                    <button type="button" onClick={clearPartyDate}>
                        {partyDetailsContent.dateUnknownLabel}
                    </button>
                )}
            </div>

            <p id="party-quantity-help">{partyDetailsContent.quantityHelp}</p>

            <div>
                <label htmlFor="party-adults">
                    {partyDetailsContent.adultsLabel}
                </label>

                <input
                    id="party-adults"
                    name="adultsCount"
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    placeholder={partyDetailsContent.quantityUnknownLabel}
                    value={adultsCount}
                    onChange={handleAdultsChange}
                    onBlur={handleAdultsChange}
                    aria-invalid={adultsInvalid}
                    aria-describedby={
                        adultsInvalid
                            ? "party-quantity-help party-adults-error"
                            : "party-quantity-help"
                    }
                />

                <div aria-live="polite">
                    {adultsInvalid && (
                        <p id="party-adults-error">
                            {partyDetailsContent.quantityInvalidMessage}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="party-children">
                    {partyDetailsContent.childrenLabel}
                </label>

                <input
                    id="party-children"
                    name="childrenCount"
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    placeholder={partyDetailsContent.quantityUnknownLabel}
                    value={childrenCount}
                    onChange={handleChildrenChange}
                    onBlur={handleChildrenChange}
                    aria-invalid={childrenInvalid}
                    aria-describedby={
                        childrenInvalid
                            ? "party-quantity-help party-children-error"
                            : "party-quantity-help"
                    }
                />

                <div aria-live="polite">
                    {childrenInvalid && (
                        <p id="party-children-error">
                            {partyDetailsContent.quantityInvalidMessage}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="party-birthday-name">
                    {partyDetailsContent.birthdayNameLabel}
                </label>

                <input
                    id="party-birthday-name"
                    name="birthdayName"
                    type="text"
                    value={birthdayName}
                    onChange={(event) => setBirthdayName(event.target.value)}
                />
            </div>

            <div>
                <label htmlFor="party-birthday-age">
                    {partyDetailsContent.birthdayAgeLabel}
                </label>

                <input
                    id="party-birthday-age"
                    name="birthdayAge"
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    value={birthdayAge}
                    onChange={handleBirthdayAgeChange}
                    onBlur={handleBirthdayAgeChange}
                    aria-invalid={birthdayAgeInvalid}
                    aria-describedby={
                        birthdayAgeInvalid
                            ? "party-birthday-age-error"
                            : undefined
                    }
                />

                <div aria-live="polite">
                    {birthdayAgeInvalid && (
                        <p id="party-birthday-age-error">
                            {partyDetailsContent.birthdayAgeInvalidMessage}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="party-observations">
                    {partyDetailsContent.observationsLabel}
                </label>

                <textarea
                    id="party-observations"
                    name="observations"
                    rows={4}
                    value={observations}
                    onChange={(event) => setObservations(event.target.value)}
                />
            </div>

            {selectedCombo && (
                <fieldset>
                    <legend>{addonsContent.title}</legend>

                    {availableAddons.length > 0 ? (
                        <ul>
                            {availableAddons.map((addon) => (
                                <li key={addon.id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="addons"
                                            value={addon.id}
                                            checked={
                                                includedAddonIds.includes(
                                                    addon.id,
                                                ) ||
                                                selectedAddonIds.includes(
                                                    addon.id,
                                                )
                                            }
                                            disabled={includedAddonIds.includes(
                                                addon.id,
                                            )}
                                            onChange={(event) =>
                                                handleAddonChange(
                                                    addon.id,
                                                    event.target.checked,
                                                )
                                            }
                                        />
                                        {addon.label}
                                        {includedAddonIds.includes(
                                            addon.id,
                                        ) && (
                                            <span>
                                                {" "}
                                                — {addonsContent.includedLabel}
                                            </span>
                                        )}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{addonsContent.emptyMessage}</p>
                    )}
                </fieldset>
            )}

            {selectedCombo && (
                <section aria-labelledby="party-summary-title">
                    <h2 id="party-summary-title">{summaryContent.title}</h2>

                    {requesterName.trim() && (
                        <p>
                            {partyDetailsContent.requesterNameSummaryLabel}{" "}
                            {requesterName.trim()}
                        </p>
                    )}

                    <p>
                        {partyDetailsContent.dateSummaryLabel}{" "}
                        {partyDateInvalid
                            ? partyDetailsContent.dateInvalidSummary
                            : partyDate
                              ? partyDate.split("-").reverse().join("/")
                              : partyDetailsContent.dateUnknownLabel}
                    </p>

                    <p>
                        {partyDetailsContent.adultsSummaryLabel}{" "}
                        {adultsInvalid
                            ? partyDetailsContent.quantityInvalidSummary
                            : adultsCount === ""
                              ? partyDetailsContent.quantityUnknownLabel
                              : adultsCount}
                    </p>

                    <p>
                        {partyDetailsContent.childrenSummaryLabel}{" "}
                        {childrenInvalid
                            ? partyDetailsContent.quantityInvalidSummary
                            : childrenCount === ""
                              ? partyDetailsContent.quantityUnknownLabel
                              : childrenCount}
                    </p>

                    {birthdayName.trim() && (
                        <p>
                            {partyDetailsContent.birthdayNameSummaryLabel}{" "}
                            {birthdayName.trim()}
                        </p>
                    )}

                    {(birthdayAge !== "" || birthdayAgeInvalid) && (
                        <p>
                            {partyDetailsContent.birthdayAgeSummaryLabel}{" "}
                            {birthdayAgeInvalid
                                ? partyDetailsContent.birthdayAgeInvalidSummary
                                : birthdayAge}
                        </p>
                    )}

                    <p>
                        {content.selectedLabel} {selectedCombo.title}
                    </p>

                    {summaryAddons.length > 0 ? (
                        <ul>
                            {summaryAddons.map((addon) => (
                                <li key={addon.id}>
                                    {addon.label}
                                    {includedAddonIds.includes(addon.id) && (
                                        <span>
                                            {" "}
                                            — {addonsContent.includedLabel}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{summaryContent.emptyMessage}</p>
                    )}

                    {observations.trim() && (
                        <div>
                            <p>
                                {partyDetailsContent.observationsSummaryLabel}
                            </p>
                            <p className={styles.observationsText}>
                                {observations.trim()}
                            </p>
                        </div>
                    )}

                    <div>
                        <h3>{summaryContent.conditionsTitle}</h3>

                        <ul>
                            {selectedCombo.eventInfo.map((condition) => (
                                <li key={condition}>{condition}</li>
                            ))}
                        </ul>

                        <div role="status">
                            {reviewMessages.length > 0 && (
                                <div>
                                    <h3>{summaryContent.reviewTitle}</h3>

                                    <ul>
                                        {reviewMessages.map((message) => (
                                            <li key={message}>{message}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <p>{summaryContent.commercialNotice}</p>
                    </div>
                </section>
            )}

            <div>
                <button type="submit" aria-describedby="party-whatsapp-note">
                    {whatsappContent.submitLabel}
                </button>

                <p id="party-whatsapp-note">{whatsappContent.submitNote}</p>
            </div>
        </form>
    );
}
