import {
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";

export type CountryOption = {
  code: CountryCode;
  callingCode: string;
  name: string;
  flag: string;
};

const FALLBACK_FLAG = "🏳️";

const toFlagEmoji = (countryCode: string): string => {
  if (countryCode.length !== 2) {
    return FALLBACK_FLAG;
  }

  return String.fromCodePoint(
    ...countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
  );
};

export function getCountryOptions(locale: string): CountryOption[] {
  const regionNames = new Intl.DisplayNames([locale], { type: "region" });

  return getCountries()
    .map((countryCode) => {
      try {
        const callingCode = getCountryCallingCode(countryCode);
        return {
          code: countryCode,
          callingCode: `+${callingCode}`,
          name: regionNames.of(countryCode) ?? countryCode,
          flag: toFlagEmoji(countryCode),
        } satisfies CountryOption;
      } catch {
        return null;
      }
    })
    .filter(
      (country): country is CountryOption =>
        country !== null &&
        country.name !== "Israel" &&
        country.name !== "United States Minor Outlying Islands" &&
        country.name !== "United States Virgin Islands" &&
        country.name !== "إسرائيل" &&
        country.name !== "British Indian Ocean Territory" &&
        country.name !== "Falkland Islands (Islas Malvinas)"
    )
    .sort((a, b) => a.name.localeCompare(b.name, locale));
}
