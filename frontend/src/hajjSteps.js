export const hajjSteps = [
  {
    id: "before",
    number: "1",
    title: "Before You Begin",
    note: "Ihram and Umrah · Day 0 / Late Arrival",
    sections: [
      {
        label: "Where to start",
        text: "At the Miqat (the designated outer boundary station for entering Makkah depending on your direction of travel).",
      },
      {
        label: "The action",
        items: [
          {
            id: "hajj-ihram-umrah",
            text: "Clean your body, wear the white unstitched garments (Ihram) for men or modest clothes for women, and make the intention (Niyyah) for Umrah, reciting Talbiyah.",
          },
        ],
      },
      {
        label: "Tawaf (Umrah)",
        items: [
          {
            id: "hajj-tawaf-umrah",
            text: "Arrive at Masjid al-Haram (Grand Mosque) in Makkah. Circle the Kaaba 7 rounds counter-clockwise, starting and ending at the Black Stone.",
          },
        ],
      },
      {
        label: "Sa'i (Umrah)",
        items: [
          {
            id: "hajj-sai-umrah",
            text: "Walk 7 laps back and forth between the hills of Safa and Marwa (starting at Safa and ending the 7th lap at Marwa).",
          },
        ],
      },
      {
        label: "Exit Ihram",
        items: [
          {
            id: "hajj-exit-ihram",
            text: "Clip or shave your hair to complete Umrah, and rest in Makkah until Hajj starts.",
          },
        ],
      },
    ],
  },
  {
    id: "day-1",
    number: "2",
    title: "Day 1",
    note: "8th of Dhul-Hijjah · Tariyah Day",
    sections: [
      {
        label: "Where to start",
        items: [
          {
            id: "hajj-reenter-ihram",
            text: "Re-enter the state of Ihram for Hajj with a new intention from your accommodation in Makkah.",
          },
        ],
      },
      {
        label: "Where to go",
        items: [
          {
            id: "hajj-go-mina",
            text: "Travel to Mina (about 5 km away).",
          },
        ],
      },
      {
        label: "The action",
        items: [
          {
            id: "hajj-mina-night",
            text: "Spend the day and night in Mina, praying Dhuhr, Asr, Maghrib, Isha, and Fajr (shortening the 4-rakat prayers to 2, without combining them).",
          },
        ],
      },
    ],
  },
  {
    id: "day-2",
    number: "3",
    title: "Day 2",
    note: "9th of Dhul-Hijjah · The Day of Arafah — The Peak of Hajj",
    sections: [
      {
        label: "Where to go",
        items: [
          {
            id: "hajj-go-arafat",
            text: "Travel from Mina to the plain of Mount Arafat after sunrise.",
          },
        ],
      },
      {
        label: "The action (Wuquf)",
        items: [
          {
            id: "hajj-wuquf",
            text: "This is the most crucial pillar of Hajj. Stand, pray, and make continuous Du'a (supplication) and repentance facing the Qibla from midday until sunset. Your Hajj is invalid if you miss Arafat.",
          },
        ],
      },
      {
        label: "Where to go next",
        items: [
          {
            id: "hajj-go-muzdalifah",
            text: "After sunset, depart Arafat and travel to Muzdalifah.",
          },
        ],
      },
      {
        label: "The action at Muzdalifah",
        items: [
          {
            id: "hajj-muzdalifah",
            text: "Combine Maghrib and Isha prayers, spend the night under the open sky, and gather 49 to 70 pebbles for the stoning ritual (Rami).",
          },
        ],
      },
    ],
  },
  {
    id: "day-3",
    number: "4",
    title: "Day 3",
    note: "10th of Dhul-Hijjah · Eid al-Adha / Yaum al-Nahr",
    sections: [
      {
        label: "Where to go",
        items: [
          {
            id: "hajj-return-mina",
            text: "Travel back from Muzdalifah to Mina before sunrise.",
          },
        ],
      },
      {
        label: "Stoning (Rami)",
        items: [
          {
            id: "hajj-rami-aqaba",
            text: "Throw 7 pebbles consecutively only at the largest pillar, Jamrat al-Aqaba, shouting Allahu Akbar with each toss.",
          },
        ],
      },
      {
        label: "Animal sacrifice (Qurbani)",
        items: [
          {
            id: "hajj-qurbani",
            text: "Offer the animal sacrifice (Hadi) to feed the needy (this can be arranged via vouchers/tokens through official channels).",
          },
        ],
      },
      {
        label: "Shaving or trimming hair (Halq or Taqsir)",
        items: [
          {
            id: "hajj-halq",
            text: "Men shave their heads completely or trim their hair (shaving is preferred); women cut a fingertip length of their hair. Most Ihram restrictions are now lifted (except perfume and marital relations).",
          },
        ],
      },
      {
        label: "Tawaf al-Ifadah (Makkah)",
        items: [
          {
            id: "hajj-tawaf-ifadah",
            text: "Return to the Grand Mosque in Makkah to perform another 7 rounds of Tawaf around the Kaaba, followed by 7 laps of Sa'i between Safa and Marwa. All restrictions (including perfume and clothing) are now fully lifted.",
          },
        ],
      },
      {
        label: "Where to go next",
        items: [
          {
            id: "hajj-night-mina",
            text: "Return to Mina to spend the night.",
          },
        ],
      },
    ],
  },
  {
    id: "tashreeq",
    number: "5",
    title: "Days 4 and 5",
    note: "11th and 12th (and optionally 13th) of Dhul-Hijjah · Days of Tashreeq",
    sections: [
      {
        label: "Where to stay",
        items: [
          {
            id: "hajj-stay-mina",
            text: "Mina (you must spend the nights here).",
          },
        ],
      },
      {
        label: "Stoning the pillars (Rami)",
        text: "After midday on each of these days, visit the stone complex and throw 7 pebbles at each of the three pillars in order:",
        items: [
          {
            id: "hajj-jamarah-ula",
            text: "Small pillar (Jamarah al-Ula) + make Du'a",
          },
          {
            id: "hajj-jamarah-wusta",
            text: "Middle pillar (Jamarah al-Wusta) + make Du'a",
          },
          {
            id: "hajj-jamarah-aqaba",
            text: "Large pillar (Jamrat al-Aqaba) (no Du'a here)",
          },
        ],
      },
      {
        label: "Total pebbles",
        text: "21 pebbles per day (42 total for Days 4 and 5). You can leave Mina on the 12th before sunset if you finish early.",
      },
    ],
  },
  {
    id: "farewell",
    number: "6",
    title: "Where It Ends",
    note: "The Farewell Tawaf",
    sections: [
      {
        label: "Where to go",
        items: [
          {
            id: "hajj-go-haram",
            text: "Back to the Grand Mosque in Makkah.",
          },
        ],
      },
      {
        label: "The final action",
        items: [
          {
            id: "hajj-tawaf-wada",
            text: "Perform Tawaf al-Wada (The Farewell Tawaf) by circling the Kaaba 7 rounds right before you permanently depart Makkah. This marks the official end of your Hajj journey.",
          },
        ],
      },
    ],
  },
];

export function hajjTasks() {
  return hajjSteps.flatMap((step) => step.sections.flatMap((section) => section.items ?? []));
}
