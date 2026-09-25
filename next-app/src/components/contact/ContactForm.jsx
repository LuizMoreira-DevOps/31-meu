"use client";

import { useState } from "react";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import styles from "./ContactForm.module.css";

const optionalFields = [
    { name: "partyDate", type: "date" },
    { name: "partyTime", type: "time" },
    { name: "birthdayPerson", type: "text" },
    { name: "guardian", type: "text" },
];

export default function ContactForm({ content, phone }) {
    const [errors, setErrors] = useState({});

    function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);

        const name = String(data.get("name") ?? "").trim();
        const subject = String(data.get("subject") ?? "");
        const message = String(data.get("message") ?? "").trim();

        const selectedSubject = content.fields.subject.options.find(
            (option) => option.value === subject,
        );

        const nextErrors = {};

        if (!name) {
            nextErrors.name = content.validation.nameRequired;
        }

        if (!selectedSubject) {
            nextErrors.subject = content.validation.subjectRequired;
        }

        if (!message) {
            nextErrors.message = content.validation.messageRequired;
        }

        setErrors(nextErrors);

        const firstInvalidField = Object.keys(nextErrors)[0];

        if (firstInvalidField) {
            form.elements.namedItem(firstInvalidField)?.focus();
            return;
        }

        // Confere também formatos e limites nativos dos campos.
        if (!form.reportValidity()) {
            return;
        }

        const lines = [
            content.messageIntro,
            "",
            `${content.fields.name.label}: ${name}`,
            `${content.fields.subject.label}: ${selectedSubject.label}`,
        ];

        const partyDetails = [];

        for (const field of optionalFields) {
            let value = String(data.get(field.name) ?? "").trim();

            if (!value) {
                continue;
            }

            if (field.name === "partyDate") {
                const [year, month, day] = value.split("-");
                value = `${day}/${month}/${year}`;
            }

            partyDetails.push(`${content.fields[field.name].label}: ${value}`);
        }

        if (partyDetails.length) {
            lines.push("", ...partyDetails);
        }

        lines.push("", `${content.fields.message.label}:`, message);

        const url = createWhatsAppUrl(phone, lines.join("\n"));

        window.location.assign(url);
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
            aria-labelledby="contact-form-title"
            noValidate
        >
            <header className={styles.header}>
                <h2 id="contact-form-title">{content.title}</h2>
                <p>{content.description}</p>
                <p className={styles.note}>{content.requiredNote}</p>
            </header>

            <div className={styles.field}>
                <label htmlFor="contact-name">
                    {content.fields.name.label}
                </label>

                <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    placeholder={content.fields.name.placeholder}
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                />

                {errors.name && (
                    <p id="name-error" className={styles.error}>
                        {errors.name}
                    </p>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="contact-subject">
                    {content.fields.subject.label}
                </label>

                <select
                    id="contact-subject"
                    name="subject"
                    defaultValue=""
                    required
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                        errors.subject ? "subject-error" : undefined
                    }
                >
                    <option value="" disabled>
                        {content.fields.subject.placeholder}
                    </option>

                    {content.fields.subject.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {errors.subject && (
                    <p id="subject-error" className={styles.error}>
                        {errors.subject}
                    </p>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="contact-message">
                    {content.fields.message.label}
                </label>

                <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    maxLength={2000}
                    placeholder={content.fields.message.placeholder}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                        errors.message ? "message-error" : undefined
                    }
                />

                {errors.message && (
                    <p id="message-error" className={styles.error}>
                        {errors.message}
                    </p>
                )}
            </div>

            <fieldset className={styles.optional}>
                <legend>{content.optionalTitle}</legend>
                <p>{content.optionalDescription}</p>

                <div className={styles.optionalGrid}>
                    {optionalFields.map((field) => (
                        <div className={styles.field} key={field.name}>
                            <label htmlFor={`contact-${field.name}`}>
                                {content.fields[field.name].label}
                            </label>

                            <input
                                id={`contact-${field.name}`}
                                name={field.name}
                                type={field.type}
                                maxLength={
                                    field.type === "text" ? 100 : undefined
                                }
                                placeholder={
                                    content.fields[field.name].placeholder
                                }
                            />
                        </div>
                    ))}
                </div>
            </fieldset>

            <div className={styles.submitArea}>
                <button
                    className={styles.submitButton}
                    type="submit"
                    aria-describedby="contact-submit-note"
                >
                    {content.submitLabel}
                </button>

                <p id="contact-submit-note" className={styles.note}>
                    {content.submitNote}
                </p>
            </div>
        </form>
    );
}
