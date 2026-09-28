"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitInquiry, type InquiryFormState } from "@/actions/inquiries";
import type { Dictionary, Locale } from "@/content/types";

const initialState: InquiryFormState = { status: "idle" };

export function ContactForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-clay/30 bg-clay/5 p-8">
        <h3 className="font-display text-2xl text-ink">{dict.contact.formSuccessHeading}</h3>
        <p className="mt-2 text-sm text-ink/70">{dict.contact.formSuccessBody}</p>
      </div>
    );
  }

  const fieldClass =
    "rounded-lg border border-ink/15 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none focus:border-green";

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="language" value={locale} />
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="companyWebsite">Website</label>
        <input id="companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-ink">
            {dict.contact.formName}
          </label>
          <input id="name" name="name" required minLength={2} maxLength={100} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-ink">
            {dict.contact.formEmail}
          </label>
          <input id="email" name="email" type="email" required maxLength={200} className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-ink">
            {dict.contact.formPhone}{" "}
            <span className="font-normal text-ink/45">({dict.contact.formPhoneOptional})</span>
          </label>
          <input id="phone" name="phone" type="tel" maxLength={30} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="intent" className="text-sm font-medium text-ink">
            {dict.contact.formIntent}
          </label>
          <select id="intent" name="intent" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              —
            </option>
            {dict.contact.formIntents.map((intent) => (
              <option key={intent.value} value={intent.value}>
                {intent.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-ink">
          {dict.contact.formMessage}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder={dict.contact.formMessagePlaceholder}
          className={`resize-none ${fieldClass}`}
        />
      </div>

      <label htmlFor="consent" className="flex items-start gap-3 text-sm text-ink/75">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          value="true"
          className="mt-0.5 h-4 w-4 rounded border-ink/30 text-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-green"
        />
        <span>
          {dict.contact.formConsentPrefix}
          <Link href={`/${locale}/datenschutz`} className="underline underline-offset-2 hover:text-ink">
            {dict.contact.formConsentLinkLabel}
          </Link>
          {dict.contact.formConsentSuffix}
        </span>
      </label>

      {state.status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {dict.contact.formErrorBody}
        </p>
      )}
      {state.status === "unavailable" && (
        <p className="text-sm text-ink/60" role="status">
          {dict.contact.formUnavailable}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-lime px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-lime/90 disabled:opacity-60 sm:w-auto"
      >
        {dict.contact.formSubmit}
      </button>
    </form>
  );
}
