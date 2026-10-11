import { useI18n } from "./i18n/I18nContext.jsx";
import { journeys } from "./journeys.js";

export default function UmrahGuide({ journeyId, onBack }) {
  const { t } = useI18n();
  const journey = journeys[journeyId];

  return (
    <main className="guide">
      <div className="guide-wrap">
        <header className="guide-top">
          <button className="back" type="button" onClick={onBack}>
            {t("Back")}
          </button>
          <p className="brand">{t("Hajj and Umrah Services")}</p>
        </header>

        <p className="kicker">{t(journey.name)}</p>
        <h1>{t(journey.title)}</h1>
        {journey.intro.map((paragraph) => (
          <p className="guide-intro" key={paragraph}>
            {t(paragraph)}
          </p>
        ))}

        <ol className="step-nav" aria-label={`${journey.name} steps`}>
          {journey.steps.map((step) => (
            <li key={step.id}>
              <a href={`#${step.id}`}>
                <span>{step.number}</span>
                {t(step.title)}
              </a>
            </li>
          ))}
        </ol>

        <ol className="steps">
          {journey.steps.map((step) => (
            <li className="step" id={step.id} key={step.id}>
              <p className="step-number">{t("Step {number}", { number: step.number })}</p>
              <h2>{t(step.title)}</h2>
              <p className="step-note">{t(step.note)}</p>

              {step.sections.map((section) => (
                <section className="block" key={section.label}>
                  <h3>{t(section.label)}</h3>
                  {section.text && <p>{t(section.text)}</p>}
                  {section.items && (
                    <ul>
                      {section.items.map((item) => (
                        <li key={item.id}>{t(item.text)}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
