import { useEffect, useRef, useState } from "react";
import { api } from "./api.js";
import { useI18n } from "./i18n/I18nContext.jsx";
import { journeys } from "./journeys.js";

export default function UmrahChecklist({ journeyId, progressId, onBack }) {
  const { t } = useI18n();
  const journey = journeys[journeyId];
  const tasks = journey.tasks;
  const total = tasks.length;
  const taskIds = new Set(tasks.map((task) => task.id));
  const [completed, setCompleted] = useState([]);
  const [status, setStatus] = useState("loading");
  const [saveState, setSaveState] = useState("saved");
  const [celebrate, setCelebrate] = useState(false);
  const completedRef = useRef([]);
  const saveTicket = useRef(0);
  const closeRef = useRef(null);

  useEffect(() => {
    let active = true;
    api(`/api/progress/${progressId}`)
      .then((data) => {
        if (!active) return;
        completedRef.current = data.completed_keys;
        setCompleted(data.completed_keys);
        setStatus("ready");
      })
      .catch((error) => {
        if (!active) return;
        setStatus(error.status === 404 ? "missing" : "error");
      });
    return () => {
      active = false;
    };
  }, [progressId]);

  useEffect(() => {
    if (!celebrate) return;
    closeRef.current?.focus();
    function onKey(event) {
      if (event.key === "Escape") setCelebrate(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [celebrate]);

  function knownCount(keys) {
    return keys.filter((id) => taskIds.has(id)).length;
  }

  function idsIn(step) {
    return step.sections.flatMap((section) => (section.items || []).map((item) => item.id));
  }

  function stepIsComplete(step, keys) {
    const ids = idsIn(step);
    return ids.length > 0 && ids.every((id) => keys.includes(id));
  }

  function canToggle(taskId, keys) {
    const index = journey.steps.findIndex((step) => idsIn(step).includes(taskId));
    if (index < 0) return false;
    const open = journey.steps.findIndex((step) => !stepIsComplete(step, keys));
    if (open === -1) return index === journey.steps.length - 1;
    if (index === open) return true;
    if (index === open - 1 && idsIn(journey.steps[open]).every((id) => !keys.includes(id))) return true;
    return false;
  }

  async function toggle(taskId) {
    const current = completedRef.current;
    if (!canToggle(taskId, current)) return;
    const next = current.includes(taskId) ? current.filter((id) => id !== taskId) : [...current, taskId];
    const finishedNow = knownCount(current) < total && knownCount(next) === total;
    completedRef.current = next;
    setCompleted(next);
    if (finishedNow) setCelebrate(true);
    setSaveState("saving");
    const ticket = ++saveTicket.current;
    try {
      const saved = await api(`/api/progress/${progressId}`, {
        method: "PUT",
        body: JSON.stringify({ completed_keys: next }),
      });
      if (ticket !== saveTicket.current) return;
      completedRef.current = saved.completed_keys;
      setCompleted(saved.completed_keys);
      setSaveState("saved");
    } catch {
      if (ticket === saveTicket.current) setSaveState("error");
    }
  }

  const doneCount = knownCount(completed);

  return (
    <main className="guide">
      <div className="guide-wrap">
        <header className="guide-top">
          <button className="back" type="button" onClick={onBack}>
            {t("Back")}
          </button>
          <p className="brand">{t("Hajj and Umrah Services")}</p>
        </header>

        <p className="kicker">{t("Start")}</p>
        <h1>{t(journey.name)}</h1>
        {status === "loading" && <p className="guide-intro">{t("Loading progress...")}</p>}
        {status === "missing" && <p className="save-error">{t("This saved progress was not found.")}</p>}
        {status === "error" && (
          <p className="save-error">
            {t("Progress could not be opened. Check that the API and database are running.")}
          </p>
        )}

        {status === "ready" && (
          <>
            {journey.intro.map((paragraph) => (
              <p className="guide-intro" key={paragraph}>
                {t(paragraph)}
              </p>
            ))}
            <p className="guide-intro progress-line">
              {t("{done} of {total} done", { done: doneCount, total })}
              <span className="save-state">
                {saveState === "saving" && t("Saving...")}
                {saveState === "saved" && t("Saved")}
                {saveState === "error" && t("Not saved")}
              </span>
            </p>
            <div className="meter" aria-hidden="true">
              <span style={{ "--fill": `${total === 0 ? 0 : (doneCount / total) * 100}%` }} />
            </div>

            <ol className="step-nav" aria-label={`${journey.name} steps`}>
              {journey.steps.map((step) => (
                <li key={step.id}>
                  <a href={`#${journeyId}-${step.id}`}>
                    <span>{step.number}</span>
                    {t(step.title)}
                  </a>
                </li>
              ))}
            </ol>

            <ol className="steps">
              {journey.steps.map((step) => {
                const locked = idsIn(step).every((id) => !canToggle(id, completed));
                return (
                <li className={locked ? "step is-locked" : "step"} id={`${journeyId}-${step.id}`} key={step.id}>
                  <p className="step-number">{t("Step {number}", { number: step.number })}</p>
                  <h2>{t(step.title)}</h2>
                  <p className="step-note">{t(step.note)}</p>
                  {step.sections.map((section) => (
                    <section className="block" key={section.label}>
                      <h3>{t(section.label)}</h3>
                      {section.text && <p>{t(section.text)}</p>}
                      {section.items && (
                        <ul className="task-list">
                          {section.items.map((item) => {
                            const done = completed.includes(item.id);
                            const allowed = canToggle(item.id, completed);
                            return (
                              <li className={done ? "task is-done" : "task"} key={item.id}>
                                <button
                                  className="done"
                                  type="button"
                                  aria-pressed={done}
                                  disabled={!allowed}
                                  onClick={() => toggle(item.id)}
                                >
                                  {t("Done")}
                                </button>
                                <p>{t(item.text)}</p>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </section>
                  ))}
                </li>
                );
              })}
            </ol>
          </>
        )}
      </div>

      {celebrate && (
        <div className="popup-backdrop" onClick={() => setCelebrate(false)}>
          <div
            className="popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="complete-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mark" aria-hidden="true" />
            <h2 id="complete-title">{t(journey.complete)}</h2>
            <button className="primary" type="button" ref={closeRef} onClick={() => setCelebrate(false)}>
              {t("Close")}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
