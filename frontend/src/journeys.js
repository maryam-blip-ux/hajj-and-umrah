import { hajjSteps, hajjTasks } from "./hajjSteps.js";
import { umrahSteps, umrahTasks } from "./umrahSteps.js";

export const journeys = {
  umrah: {
    id: "umrah",
    name: "Umrah",
    title: "Four steps, in order",
    intro: [
      "Start with Ihram, then Tawaf, then Sa'i, and finish by trimming or shaving your hair.",
    ],
    steps: umrahSteps,
    tasks: umrahTasks(),
    complete: "Alhamdulillah, You have completed Umrah",
  },
  hajj: {
    id: "hajj",
    name: "Hajj",
    title: "The days of Hajj",
    intro: [
      "Hajj is a sacred 5-day Islamic pilgrimage in Makkah, Saudi Arabia, performed during the month of Dhul-Hijjah. It officially begins at the Miqat boundary and ends at the Grand Mosque in Makkah with the farewell tawaf.",
      "Below is the step-by-step guide detailing the locations, the rounds, and the flow of the journey, most commonly performed as Hajj al-Tamattu (Umrah combined with Hajj).",
    ],
    steps: hajjSteps,
    tasks: hajjTasks(),
    complete: "Alhamdulillah, You have completed Hajj",
  },
};
