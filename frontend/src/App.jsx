import { useEffect, useState } from "react";
import LanguageSelect from "./LanguageSelect.jsx";
import UmrahChecklist from "./UmrahChecklist.jsx";
import UmrahGuide from "./UmrahGuide.jsx";
import UmrahSaved from "./UmrahSaved.jsx";
import { useI18n } from "./i18n/I18nContext.jsx";
import "./App.css";

function pageFromPath(path) {
  if (path === "/umrah" || path === "/hajj") {
    return { name: "guide", journey: path.slice(1) };
  }
  const saved = path.match(/^\/start\/(umrah|hajj)$/);
  if (saved) return { name: "saved", journey: saved[1] };
  const checklist = path.match(/^\/start\/(umrah|hajj)\/(\d+)$/);
  if (checklist) return { name: "checklist", journey: checklist[1], id: Number(checklist[2]) };
  return { name: "home" };
}

export default function App() {
  const { t } = useI18n();
  const [path, setPath] = useState(window.location.pathname);
  const [howOpen, setHowOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function navigate(next) {
    window.history.pushState({}, "", next);
    setPath(next);
  }

  const page = pageFromPath(path);

  let content;
  if (page.name === "guide") {
    content = (
      <UmrahGuide
        journeyId={page.journey}
        onBack={() => {
          setHowOpen(true);
          navigate("/");
        }}
      />
    );
  } else if (page.name === "saved") {
    content = (
      <UmrahSaved
        journeyId={page.journey}
        onBack={() => {
          setStartOpen(true);
          navigate("/");
        }}
        onOpen={(id) => navigate(`/start/${page.journey}/${id}`)}
        onCreate={(id) => navigate(`/start/${page.journey}/${id}`)}
      />
    );
  } else if (page.name === "checklist") {
    content = (
      <UmrahChecklist
        journeyId={page.journey}
        progressId={page.id}
        onBack={() => navigate(`/start/${page.journey}`)}
      />
    );
  } else {
    content = (
    <main className="page">
      <section className="panel">
        <div className="mark" aria-hidden="true" />
        <h1>{t("Hajj and Umrah Services")}</h1>
        <p className="lede">{t("Learn the steps, or start and keep your progress.")}</p>

        <div className="groups">
          <div className="group">
            <button
              className="primary"
              type="button"
              aria-expanded={howOpen}
              aria-controls="how-choices"
              onClick={() => setHowOpen(true)}
            >
              {t("How to Perform")}
            </button>
            {howOpen && (
              <div id="how-choices" className="choices stack" role="group" aria-label="How to perform">
                <button className="choice" type="button" onClick={() => navigate("/hajj")}>
                  {t("Hajj")}
                </button>
                <button className="choice" type="button" onClick={() => navigate("/umrah")}>
                  {t("Umrah")}
                </button>
              </div>
            )}
          </div>

          <div className="group">
            <button
              className="primary"
              type="button"
              aria-expanded={startOpen}
              aria-controls="start-choices"
              onClick={() => setStartOpen(true)}
            >
              {t("Start")}
            </button>
            {startOpen && (
              <div id="start-choices" className="choices stack" role="group" aria-label="Start">
                <button className="choice" type="button" onClick={() => navigate("/start/hajj")}>
                  {t("Hajj")}
                </button>
                <button className="choice" type="button" onClick={() => navigate("/start/umrah")}>
                  {t("Umrah")}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
    );
  }

  return (
    <>
      <LanguageSelect />
      {content}
    </>
  );
}
