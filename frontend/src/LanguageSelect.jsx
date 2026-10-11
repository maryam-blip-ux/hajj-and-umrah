import { useI18n } from "./i18n/I18nContext.jsx";

export default function LanguageSelect() {
  const { language, languages, setLanguage, t } = useI18n();

  return (
    <label className="lang">
      <span className="visually-hidden">{t("Language")}</span>
      <select
        value={language.code}
        aria-label={t("Language")}
        onChange={(event) => setLanguage(event.target.value)}
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
}
