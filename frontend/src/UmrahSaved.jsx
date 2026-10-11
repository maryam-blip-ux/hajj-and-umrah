import { useEffect, useState } from "react";
import { api, formatWhen } from "./api.js";
import { useI18n } from "./i18n/I18nContext.jsx";
import { journeys } from "./journeys.js";

export default function UmrahSaved({ journeyId, onBack, onOpen, onCreate }) {
  const { t } = useI18n();
  const journey = journeys[journeyId];
  const total = journey.tasks.length;
  const taskIds = new Set(journey.tasks.map((task) => task.id));
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [creating, setCreating] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    api(`/api/progress?journey=${journeyId}`)
      .then((data) => {
        if (!active) return;
        setItems(data);
        setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [journeyId]);

  async function makeNew() {
    setCreating(true);
    try {
      const created = await api("/api/progress", {
        method: "POST",
        body: JSON.stringify({ journey: journeyId }),
      });
      onCreate(created.id);
    } catch {
      setStatus("error");
      setCreating(false);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await api(`/api/progress/${pendingDelete.id}`, { method: "DELETE" });
      setItems((current) => current.filter((item) => item.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (error) {
      if (error.status === 404) {
        setItems((current) => current.filter((item) => item.id !== pendingDelete.id));
        setPendingDelete(null);
      }
    } finally {
      setDeleting(false);
    }
  }

  function doneCount(item) {
    return item.completed_keys.filter((id) => taskIds.has(id)).length;
  }

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
        <p className="guide-intro">{t("Open a saved progress, or make a new one.")}</p>

        <button className="primary new-progress" type="button" onClick={makeNew} disabled={creating}>
          {creating ? t("Making a new one...") : t("Make a new one")}
        </button>

        <h2 className="saved-heading">{t("Saved progress")}</h2>
        {status === "loading" && <p className="guide-intro">{t("Loading saved progress...")}</p>}
        {status === "error" && (
          <p className="save-error">
            {t("Saved progress could not be reached. Check that the API and database are running.")}
          </p>
        )}
        {status === "ready" && items.length === 0 && (
          <p className="guide-intro">{t("No saved progress yet.")}</p>
        )}
        {status === "ready" && items.length > 0 && (
          <ul className="saved-list">
            {items.map((item) => (
              <li className="saved-row" key={item.id}>
                <button className="saved" type="button" onClick={() => onOpen(item.id)}>
                  <strong>{t(journey.name)}</strong>
                  <span>{formatWhen(item.updated_at)}</span>
                  <span>{t("{done} of {total} done", { done: doneCount(item), total })}</span>
                </button>
                <button className="delete" type="button" onClick={() => setPendingDelete(item)}>
                  {t("Delete")}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {pendingDelete && (
        <div className="popup-backdrop" onClick={() => !deleting && setPendingDelete(null)}>
          <div
            className="popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="delete-title">{t("Delete this saved progress?")}</h2>
            <p>{t("This {name} progress will be removed.", { name: t(journey.name) })}</p>
            <div className="popup-actions">
              <button className="choice" type="button" onClick={() => setPendingDelete(null)} disabled={deleting}>
                {t("Cancel")}
              </button>
              <button className="primary" type="button" onClick={confirmDelete} disabled={deleting}>
                {deleting ? t("Deleting...") : t("Delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
