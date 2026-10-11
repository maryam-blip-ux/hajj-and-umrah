export const umrahSteps = [
  {
    id: "ihram",
    number: "1",
    title: "Entering the State of Ihram",
    note: "The Start",
    sections: [
      {
        label: "Where it starts",
        text: "At or just before reaching the Miqat (the designated boundary stations outside Makkah). If flying, you prepare and make the intention on the airplane before the pilot announces crossing the Miqat.",
      },
      {
        label: "What to do",
        items: [
          {
            id: "ihram-cleanse",
            text: "Cleanse yourself (take a shower/ghusl, clip nails).",
          },
          {
            id: "ihram-garments",
            text: "Wear the Ihram garments. Men wear two white seamless sheets; women wear modest, regular Islamic clothing that covers the body, leaving the face and hands open.",
          },
          {
            id: "ihram-prayer",
            text: "Pray two rak'ahs of optional prayer (if time permits).",
          },
          {
            id: "ihram-niyyah",
            text: 'Make the Niyyah (intention) in your heart for Umrah and say: "Labbaik Allahumma Umrah" (O Allah, here I am to perform Umrah).',
          },
          {
            id: "ihram-talbiyah",
            text: 'Recite the Talbiyah continuously: "Labbaik Allahumma labbaik, labbaik la sharika laka labbaik..." until you reach the Kaaba.',
          },
        ],
      },
    ],
  },
  {
    id: "tawaf",
    number: "2",
    title: "Tawaf",
    note: "Circling the Kaaba",
    sections: [
      {
        label: "Where it starts and ends",
        text: "Starts and ends at the corner of the Black Stone (Hajar al-Aswad).",
      },
      {
        label: "Number of rounds",
        text: "7 rounds.",
      },
      {
        label: "How it works",
        items: [
          {
            id: "tawaf-direction",
            text: "Walk in a counterclockwise direction (keeping the Kaaba on your left side).",
          },
          {
            id: "tawaf-black-stone",
            text: 'Each time you pass the Black Stone, face it, raise your hand, and say "Bismillahi Allahu Akbar".',
          },
          {
            id: "tawaf-ramal",
            text: "Men uncover their right shoulder (Idtiba) and walk briskly (Ramal) during only the first 3 rounds, then walk normally for the remaining 4 rounds.",
          },
          {
            id: "tawaf-prayer",
            text: "After finishing all 7 rounds, cover your shoulder and pray 2 short rak'ahs behind or near Maqam Ibrahim (Station of Ibrahim) if possible, or anywhere in the mosque.",
          },
          {
            id: "tawaf-zamzam",
            text: "Drink Zamzam water after your prayer.",
          },
        ],
      },
    ],
  },
  {
    id: "sai",
    number: "3",
    title: "Sa'i",
    note: "Walking Between Safa and Marwah",
    sections: [
      {
        label: "Where it starts and ends",
        text: "Starts at the hill of Safa and ends at the hill of Marwah.",
      },
      {
        label: "Number of rounds",
        text: "7 total laps.",
      },
      {
        label: "How it works",
        items: [
          {
            id: "sai-lap-1",
            text: "Going from Safa to Marwah counts as 1 lap.",
          },
          {
            id: "sai-lap-2",
            text: "Returning from Marwah to Safa counts as the 2nd lap.",
          },
          {
            id: "sai-lap-7",
            text: "You will finish your 7th lap at Marwah.",
          },
          {
            id: "sai-dua",
            text: "When reaching each hill, face the Kaaba (if visible), raise your hands in supplication (dua), and praise Allah.",
          },
          {
            id: "sai-green-lights",
            text: "Men run/jog lightly between the two designated green light markers on the path, while women walk at a normal pace.",
          },
        ],
      },
    ],
  },
  {
    id: "halq",
    number: "4",
    title: "Halq or Taqsir",
    note: "Shaving or Trimming Hair — The End",
    sections: [
      {
        label: "Where it ends",
        text: "Anywhere inside or outside the Haram area after completing Sa'i.",
      },
      {
        label: "What to do",
        items: [
          {
            id: "halq-men",
            text: "Men: Can completely shave their head (Halq, which brings more reward) or trim hair evenly all over (Taqsir).",
          },
          {
            id: "halq-women",
            text: "Women: Cut a small fingertip-length (about 1 inch) piece from the ends of their hair.",
          },
        ],
      },
      {
        label: "The completion",
        text: "Once your hair is trimmed or shaved, your Umrah is officially complete, and all restrictions of Ihram are lifted.",
      },
    ],
  },
];

export function umrahTasks() {
  return umrahSteps.flatMap((step) =>
    step.sections.flatMap((section) => section.items ?? []),
  );
}
