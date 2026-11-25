import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type IconName =
  | "activity"
  | "arrow"
  | "bot"
  | "calendar"
  | "chart"
  | "check"
  | "chevron"
  | "clock"
  | "dumbbell"
  | "food"
  | "home"
  | "plus"
  | "search"
  | "settings"
  | "sparkles"
  | "user";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    activity: <path d="M3 12h4l2-7 4 14 2-7h6" />,
    arrow: <path d="m9 18 6-6-6-6" />,
    bot: (
      <>
        <rect x="4" y="6" width="16" height="13" rx="4" />
        <path d="M12 2v4M8.5 11h.01M15.5 11h.01M9 15h6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    dumbbell: (
      <>
        <path d="M6.5 6.5v11M3.5 8.5v7M17.5 6.5v11M20.5 8.5v7M6.5 12h11" />
      </>
    ),
    food: (
      <>
        <path d="M7 3v7M4 3v4a3 3 0 0 0 6 0V3M7 10v11M16 3v18M16 3c3 1 4 4 4 7h-4" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.15.38.37.72.66 1 .3.27.69.42 1.1.4H21v4h-.1a1.7 1.7 0 0 0-1.5.6Z" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14ZM19 13l.6 1.4L21 15l-1.4.6L19 17l-.6-1.4L17 15l1.4-.6L19 13Z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}

function Button({
  children,
  className = "",
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

const week = [
  { day: "PO", date: 14 },
  { day: "ÚT", date: 15 },
  { day: "ST", date: 16 },
  { day: "ČT", date: 17 },
  { day: "PÁ", date: 18 },
  { day: "SO", date: 19 },
  { day: "NE", date: 20 },
];

const exercises = [
  { name: "Bench press", sets: "4 série", reps: "8 opakování", weight: "80 kg" },
  { name: "Incline DB press", sets: "3 série", reps: "10 opakování", weight: "24 kg" },
  { name: "Cable fly", sets: "3 série", reps: "12 opakování", weight: "18 kg" },
  { name: "Triceps pushdown", sets: "3 série", reps: "12 opakování", weight: "25 kg" },
];

type WorkoutExercise = {
  name: string;
  prescription: string;
  rest: string;
  description: string;
};

type Workout = {
  day: string;
  title: string;
  meta: string;
  state: string;
  tone: string;
  focus: string;
  exercises: WorkoutExercise[];
};

const workoutPlan: Workout[] = [
  {
    day: "PO",
    title: "Hrudník & triceps",
    meta: "4 cviky · 55 min",
    state: "Dokončeno",
    tone: "complete",
    focus: "Síla hrudníku a objem tricepsů",
    exercises: [
      { name: "Bench press", prescription: "4 série · 8 opakování · 80 kg", rest: "120 s", description: "Lopatky drž stažené, chodidla pevně na zemi a činku spouštěj kontrolovaně ke spodní části hrudníku." },
      { name: "Incline DB press", prescription: "3 série · 10 opakování · 24 kg", rest: "90 s", description: "Lavici nastav přibližně na 30°. Lokty veď mírně pod úrovní ramen a nahoře činky nesrážej." },
      { name: "Cable fly", prescription: "3 série · 12 opakování · 18 kg", rest: "60 s", description: "Udržuj lehce pokrčené lokty a soustřeď se na plynulé sevření hrudníku bez švihu." },
      { name: "Triceps pushdown", prescription: "3 série · 12 opakování · 25 kg", rest: "60 s", description: "Lokty nech u těla, ramena drž dole a v dolní pozici triceps na okamžik zatni." },
    ],
  },
  {
    day: "ST",
    title: "Záda & biceps",
    meta: "5 cviků · 65 min",
    state: "Dnes",
    tone: "today",
    focus: "Šířka zad, stabilita lopatek a biceps",
    exercises: [
      { name: "Shyby nadhmatem", prescription: "4 série · 6–8 opakování", rest: "120 s", description: "Začni pohyb stažením lopatek, hrudník směřuj k hrazdě a vyhni se houpání." },
      { name: "Přítahy velké činky", prescription: "4 série · 8 opakování · 70 kg", rest: "120 s", description: "Drž neutrální páteř, pevný střed těla a činku přitahuj směrem k pasu." },
      { name: "Stahování kladky", prescription: "3 série · 10 opakování · 55 kg", rest: "90 s", description: "Táhni lokty dolů k bokům a v dolní pozici krátce stáhni lopatky." },
      { name: "Face pull", prescription: "3 série · 15 opakování · 20 kg", rest: "60 s", description: "Lano přitahuj k obličeji, lokty drž vysoko a soustřeď se na zadní část ramen." },
      { name: "Bicepsový zdvih", prescription: "3 série · 10 opakování · 14 kg", rest: "60 s", description: "Lokty zafixuj u těla a činky zvedej bez pohybu ramen nebo trupu." },
    ],
  },
  {
    day: "PÁ",
    title: "Nohy & core",
    meta: "6 cviků · 70 min",
    state: "Naplánováno",
    tone: "",
    focus: "Síla dolní části těla a stabilní střed",
    exercises: [
      { name: "Dřep s činkou", prescription: "4 série · 6 opakování · 95 kg", rest: "150 s", description: "Kolena veď ve směru špiček, drž zpevněný střed a klesej alespoň do paralelní pozice." },
      { name: "Rumunský mrtvý tah", prescription: "4 série · 8 opakování · 85 kg", rest: "120 s", description: "Posouvej boky dozadu, činku drž blízko nohou a zachovej neutrální záda." },
      { name: "Leg press", prescription: "3 série · 12 opakování · 160 kg", rest: "90 s", description: "Bedra nech opřená, chodidla na šířku ramen a kolena v horní pozici nezamykej." },
      { name: "Zakopávání", prescription: "3 série · 12 opakování · 40 kg", rest: "60 s", description: "Pánev drž přitisknutou k lavici a pohyb prováděj pomalu v celém rozsahu." },
      { name: "Výpony lýtek", prescription: "4 série · 15 opakování · 60 kg", rest: "60 s", description: "V dolní pozici protáhni lýtka a nahoře na sekundu zastav bez odrážení." },
      { name: "Plank", prescription: "3 série · 45 sekund", rest: "45 s", description: "Zpevni břicho a hýždě, pánev drž v neutrální pozici a pravidelně dýchej." },
    ],
  },
  {
    day: "NE",
    title: "Ramena & ruce",
    meta: "5 cviků · 60 min",
    state: "Naplánováno",
    tone: "",
    focus: "Komplexní rozvoj ramen a paží",
    exercises: [
      { name: "Tlaky nad hlavu", prescription: "4 série · 8 opakování · 45 kg", rest: "120 s", description: "Zpevni střed těla, činku veď svisle vzhůru a v horní pozici ji dostaň nad ramena." },
      { name: "Upažování", prescription: "4 série · 12 opakování · 9 kg", rest: "60 s", description: "Paže zvedej lehce před tělem do úrovně ramen a nepomáhej si švihem." },
      { name: "Obrácený peck deck", prescription: "3 série · 15 opakování · 35 kg", rest: "60 s", description: "Hrudník drž opřený a pohyb veď zadní částí ramen bez přehnaného stažení zad." },
      { name: "Kladivové zdvihy", prescription: "3 série · 10 opakování · 16 kg", rest: "60 s", description: "Dlaně směřují k sobě, lokty zůstávají u těla a zápěstí drž rovně." },
      { name: "Triceps nad hlavou", prescription: "3 série · 12 opakování · 22 kg", rest: "60 s", description: "Lokty směřuj dopředu, paže drž u hlavy a propínej je bez pohybu ramen." },
    ],
  },
];

const exerciseLibrary = Array.from(
  new Map(
    workoutPlan
      .flatMap((workout) => workout.exercises)
      .map((exercise) => [exercise.name, exercise]),
  ).values(),
);

type Meal = {
  id: string;
  name: string;
  detail: string;
  kcal: number;
  time: string;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  description: string;
};

const meals: Meal[] = [
  { id: "oats", name: "Snídaně", detail: "Ovesná kaše s borůvkami", kcal: 520, time: "07:30", protein: 24, carbs: 68, fat: 16, ingredients: ["80 g ovesných vloček", "250 ml mléka", "100 g borůvek", "20 g arašídového másla"], description: "Vyvážená snídaně s pomalými sacharidy, vlákninou a kvalitním zdrojem bílkovin." },
  { id: "chicken-bowl", name: "Oběd", detail: "Kuřecí bowl s rýží", kcal: 680, time: "12:30", protein: 52, carbs: 75, fat: 18, ingredients: ["160 g kuřecích prsou", "100 g basmati rýže", "150 g zeleniny", "10 ml olivového oleje"], description: "Kompletní hlavní jídlo s vysokým obsahem bílkovin vhodné pro regeneraci po tréninku." },
  { id: "yogurt", name: "Svačina", detail: "Řecký jogurt a ořechy", kcal: 310, time: "16:00", protein: 20, carbs: 28, fat: 13, ingredients: ["200 g řeckého jogurtu", "20 g vlašských ořechů", "10 g medu"], description: "Rychlá svačina kombinující bílkoviny, zdravé tuky a přirozeně sladkou chuť." },
  { id: "salmon", name: "Večeře", detail: "Losos, brambory a zelenina", kcal: 640, time: "19:30", protein: 46, carbs: 54, fat: 26, ingredients: ["170 g lososa", "250 g brambor", "150 g brokolice", "bylinky a citron"], description: "Výživná večeře bohatá na omega-3 mastné kyseliny a kvalitní bílkoviny." },
];

const alternateMeals: Meal[] = [
  { id: "eggs", name: "Snídaně", detail: "Vejce, avokádo a žitný chléb", kcal: 490, time: "07:30", protein: 27, carbs: 42, fat: 24, ingredients: ["3 vejce", "70 g avokáda", "2 krajíce žitného chleba", "rajčata"], description: "Sytá slaná snídaně s kvalitními tuky a dostatkem bílkovin." },
  { id: "turkey", name: "Oběd", detail: "Krůtí maso s kuskusem", kcal: 650, time: "12:30", protein: 49, carbs: 72, fat: 17, ingredients: ["170 g krůtího masa", "100 g kuskusu", "paprika a cuketa", "olivový olej"], description: "Lehký oběd s libovým masem a snadno stravitelnou přílohou." },
  { id: "banana", name: "Svačina", detail: "Banánový protein shake", kcal: 340, time: "16:00", protein: 31, carbs: 43, fat: 6, ingredients: ["1 banán", "30 g syrovátkového proteinu", "250 ml mléka", "skořice"], description: "Praktická svačina před nebo po tréninku pro rychlé doplnění energie." },
  { id: "pasta", name: "Večeře", detail: "Celozrnné těstoviny s tuňákem", kcal: 610, time: "19:30", protein: 43, carbs: 78, fat: 14, ingredients: ["100 g celozrnných těstovin", "120 g tuňáka", "rajčatová omáčka", "rukola"], description: "Jednoduchá večeře s komplexními sacharidy a libovým zdrojem bílkovin." },
];

const initialMealsByDay: Record<number, Meal[]> = {
  14: [alternateMeals[0], alternateMeals[1], meals[2], alternateMeals[3]],
  15: [meals[0], meals[1], alternateMeals[2], meals[3]],
  16: meals,
  17: [alternateMeals[0], meals[1], meals[2], alternateMeals[3]],
  18: [meals[0], alternateMeals[1], alternateMeals[2], meals[3]],
  19: [alternateMeals[0], alternateMeals[1], meals[2]],
  20: [meals[0], meals[1], alternateMeals[3]],
};

const foodDatabase = [
  { name: "Kuřecí prsa", kcal: 165, protein: 31, carbs: 0, fat: 4, unit: "100 g" },
  { name: "Losos", kcal: 208, protein: 20, carbs: 0, fat: 13, unit: "100 g" },
  { name: "Basmati rýže", kcal: 350, protein: 8, carbs: 77, fat: 1, unit: "100 g" },
  { name: "Ovesné vločky", kcal: 370, protein: 13, carbs: 60, fat: 7, unit: "100 g" },
  { name: "Řecký jogurt", kcal: 120, protein: 9, carbs: 4, fat: 7, unit: "100 g" },
  { name: "Banán", kcal: 89, protein: 1, carbs: 23, fat: 0, unit: "100 g" },
  { name: "Vejce", kcal: 78, protein: 6, carbs: 1, fat: 5, unit: "1 kus" },
  { name: "Avokádo", kcal: 160, protein: 2, carbs: 9, fat: 15, unit: "100 g" },
];

type Page = "dashboard" | "workouts" | "meals" | "stats" | "ai" | "settings";

const pageCopy: Record<Page, { eyebrow: string; title: string; subtitle: string }> = {
  dashboard: {
    eyebrow: "STŘEDA, 16. ŘÍJNA",
    title: "Dobré ráno, Jane",
    subtitle: "Dnes tě čeká silový trénink. Jdeš skvěle.",
  },
  workouts: {
    eyebrow: "TRÉNINKOVÝ PLÁN",
    title: "Tvoje tréninky",
    subtitle: "Silový plán na 4 dny týdně · hypertrofie",
  },
  meals: {
    eyebrow: "JÍDELNÍČEK",
    title: "Výživa na míru",
    subtitle: "Denní cíl 2 600 kcal pro zdravé nabírání svalů.",
  },
  stats: {
    eyebrow: "TVŮJ PROGRES",
    title: "Statistiky",
    subtitle: "Sleduj konzistenci, výkony a změny svého těla.",
  },
  ai: {
    eyebrow: "INTELIGENTNÍ ASISTENT",
    title: "FitPlanner AI",
    subtitle: "Upravuj svůj plán přirozeným jazykem.",
  },
  settings: {
    eyebrow: "TVŮJ ÚČET",
    title: "Nastavení",
    subtitle: "Spravuj svůj profil, cíle a preference aplikace.",
  },
};

const statisticsMonths = [
  [18, 16, 101200, 2590, 85.4, 65],
  [16, 13, 84200, 2520, 85.1, 67.5],
  [18, 15, 98600, 2560, 84.9, 70],
  [16, 14, 94300, 2610, 84.6, 72.5],
  [18, 16, 110400, 2580, 84.4, 75],
  [16, 14, 99500, 2540, 84.1, 77.5],
  [18, 15, 108200, 2600, 83.9, 80],
  [16, 13, 90100, 2530, 83.7, 80],
  [18, 16, 112600, 2570, 83.5, 82.5],
  [16, 14, 100500, 2550, 83.3, 82.5],
  [16, 12, 88950, 2510, 83, 85],
  [16, 14, 96420, 2548, 82.4, 92.5],
].map(([planned, completed, volume, calories, weight, bench], index) => ({
  planned, completed, volume, calories, weight, bench,
  end: new Date(2023, 10 + index, 16),
}));

function Statistics() {
  const [period, setPeriod] = useState<1 | 3 | 12>(1);
  const rows = statisticsMonths.slice(-period);
  const latest = rows[rows.length - 1];
  const previous = statisticsMonths[statisticsMonths.length - period - 1];
  const startingWeight = previous?.weight ?? 85.8;
  const startingBench = previous?.bench ?? 62.5;
  const total = rows.reduce((sum, row) => ({
    planned: sum.planned + row.planned,
    completed: sum.completed + row.completed,
    volume: sum.volume + row.volume,
    calories: sum.calories + row.calories,
  }), { planned: 0, completed: 0, volume: 0, calories: 0 });
  const consistency = Math.round(total.completed / total.planned * 100);
  const format = (value: number) => value.toLocaleString("cs-CZ", { maximumFractionDigits: 1 });
  const signed = (value: number) => `${value < 0 ? "−" : "+"}${format(Math.abs(value))}`;
  const shortDate = (date: Date) => `${date.getDate()}. ${date.getMonth() + 1}.`;
  const start = new Date(latest.end.getFullYear(), latest.end.getMonth() - period, 16);
  const weightChange = latest.weight - startingWeight;
  const benchChange = latest.bench - startingBench;
  const points = period === 1
    ? [0, .25, .5, .75, 1].map((fraction) => ({
        weight: startingWeight + weightChange * fraction,
        bench: startingBench + benchChange * fraction,
        end: new Date(start.getTime() + (latest.end.getTime() - start.getTime()) * fraction),
      }))
    : [{ weight: startingWeight, bench: startingBench, end: start }, ...rows];
  const minWeight = Math.floor(Math.min(...points.map((point) => point.weight)));
  const maxWeight = Math.ceil(Math.max(...points.map((point) => point.weight)));
  const path = points.map((point, index) =>
    `${index === 0 ? "M" : "L"}${index / (points.length - 1) * 600} ${15 + (maxWeight - point.weight) / Math.max(1, maxWeight - minWeight) * 160}`,
  ).join(" ");
  const maxBench = Math.max(...points.map((point) => point.bench));
  const summary = [
    ["Hmotnost", `${format(latest.weight)} kg`, `${signed(weightChange)} kg za období`, "green"],
    ["Tréninky", format(total.completed), `z ${total.planned} naplánovaných`, "purple"],
    ["Celkový objem", `${format(total.volume)} kg`, `Ø ${format(Math.round(total.volume / total.completed))} kg / trénink`, "orange"],
    ["Průměrný příjem", `${format(Math.round(total.calories / rows.length))} kcal`, `${Math.round(total.calories / rows.length / 2600 * 100)} % cíle`, "blue"],
  ];

  return (
    <section className="page-content">
      <div className="page-toolbar">
        <div className="segmented" role="group" aria-label="Období statistik">
          {([{ value: 1, label: "Poslední měsíc" }, { value: 3, label: "3 měsíce" }, { value: 12, label: "1 rok" }] as const).map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={period === option.value}
              className={`${period === option.value ? "selected" : ""} min-h-11! text-sm! text-slate-700! focus-visible:ring-2 focus-visible:ring-violet-600`}
              onClick={() => setPeriod(option.value)}
            >{option.label}</button>
          ))}
        </div>
        <span className="flex min-h-11 items-center gap-2 text-sm text-slate-600">
          <Icon name="calendar" size={16} />{shortDate(start)} – {shortDate(latest.end)} {latest.end.getFullYear()}
        </span>
      </div>
      <p className="mb-4 text-sm text-slate-600">Ukázková data · {period === 1 ? "poslední měsíc" : period === 3 ? "poslední 3 měsíce" : "poslední rok"}</p>
      <div className="stats-summary" aria-live="polite" aria-atomic="true">
        {summary.map(([label, value, detail, tone]) => (
          <article className="stat-card min-w-0" key={label}>
            <span className={`stat-dot ${tone}`} /><p className="pr-3 text-sm! text-slate-600!">{label}</p>
            <strong>{value}</strong><small className="text-sm! text-slate-600!">{detail}</small>
          </article>
        ))}
      </div>
      <div className="charts-grid">
        <article className="panel chart-card min-w-0">
          <div className="panel-heading">
            <div><span className="section-label">VÝVOJ HMOTNOSTI</span><h2>{format(latest.weight)} kg</h2></div>
            <span className="delta text-xs! text-green-800!">{signed(weightChange)} kg</span>
          </div>
          <div className="line-chart">
            <span className="chart-y top text-xs! text-slate-600!">{maxWeight}</span>
            <span className="chart-y middle text-xs! text-slate-600!">{format((minWeight + maxWeight) / 2)}</span>
            <span className="chart-y bottom text-xs! text-slate-600!">{minWeight}</span>
            <svg viewBox="0 0 600 190" preserveAspectRatio="none" role="img" aria-label={`Hmotnost za vybrané období: z ${format(startingWeight)} na ${format(latest.weight)} kg.`}>
              <defs><linearGradient id="stats-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8c5cf6" stopOpacity=".22" /><stop offset="1" stopColor="#8c5cf6" stopOpacity="0" /></linearGradient></defs>
              <path d={`${path} L600 190 L0 190Z`} fill="url(#stats-area)" />
              <path className="chart-line" d={path} />
            </svg>
            <div className="chart-labels text-xs! text-slate-600!">
              {[0, Math.floor((points.length - 1) / 2), points.length - 1].map((index) => <span key={index}>{shortDate(points[index].end)}</span>)}
            </div>
          </div>
        </article>
        <article className="panel consistency-card min-w-0">
          <span className="section-label">KONZISTENCE</span><h2>Tréninky za období</h2>
          <div className="donut" role="img" aria-label={`${consistency} % splněno, ${total.completed} dokončeno z ${total.planned} tréninků.`} style={{ background: `conic-gradient(#8c5cf6 0 ${consistency}%, #ece8ef ${consistency}% 100%)` }}>
            <span><strong>{consistency} %</strong><small className="text-sm! text-slate-600!">splněno</small></span>
          </div>
          <div className="legend flex-wrap text-xs! text-slate-600!"><span><i className="purple" />{total.completed} dokončeno</span><span><i />{total.planned - total.completed} vynecháno</span></div>
        </article>
      </div>
      <div className="bottom-stats">
        <article className="panel strength-card min-w-0">
          <div className="panel-heading"><div><span className="section-label">SÍLOVÝ PROGRES</span><h2>Bench press</h2></div><strong>{signed(benchChange)} kg</strong></div>
          <div className="bar-chart gap-1!" role="img" aria-label={`Bench press: z ${format(startingBench)} na ${format(latest.bench)} kg.`}>
            {points.map((point, index) => (
              <div key={index} title={`${shortDate(point.end)} ${format(point.bench)} kg`}>
                <i style={{ height: `${point.bench / maxBench * 78}%`, background: index === points.length - 1 ? "#8c5cf6" : "#d9ccf6" }} />
                <span className="text-xs text-slate-600">{points.length > 5 ? (index % 3 === 0 || index === points.length - 1 ? point.end.getMonth() + 1 : "") : shortDate(point.end)}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-600">Maximum na konci období: {format(latest.bench)} kg</p>
        </article>
        <article className="panel records-card">
          <span className="section-label">OSOBNÍ REKORDY ZA OBDOBÍ</span><h2>Nové maximum</h2>
          {[["Dřep s činkou", "11. října 2024", "120 kg"], ["Bench press", "4. října 2024", `${format(latest.bench)} kg`]].map(([name, date, value]) => (
            <div className="record" key={name}><span className="metric-icon purple"><Icon name="dumbbell" /></span><div><strong className="text-sm!">{name}</strong><small className="text-xs! text-slate-600!">{date}</small></div><strong>{value}</strong></div>
          ))}
        </article>
      </div>
    </section>
  );
}

const defaultGoals = {
  goal: "Nabírání svalů", level: "intermediate", days: "4", weight: "87", duration: "60",
  equipment: ["Plně vybavená posilovna", "Jednoručky", "Velká činka", "Kladky"],
};

function readGoals(): typeof defaultGoals {
  try {
    const value = JSON.parse(localStorage.getItem("fitplanner-goals") ?? "null");
    if (value && typeof value.goal === "string" && typeof value.level === "string" &&
        typeof value.days === "string" && typeof value.weight === "string" &&
        typeof value.duration === "string" && Array.isArray(value.equipment) &&
        value.equipment.every((item: unknown) => typeof item === "string")) return value;
  } catch { /* Storage may be unavailable. */ }
  return defaultGoals;
}

function GoalsSettings() {
  const [draft, setDraft] = useState(readGoals);
  const [message, setMessage] = useState("");
  const update = (key: keyof typeof defaultGoals, value: string | string[]) => {
    const next = { ...draft, [key]: value };
    setDraft(next);
    try {
      localStorage.setItem("fitplanner-goals", JSON.stringify(next));
      setMessage("Změna byla automaticky uložena v tomto prohlížeči.");
    } catch {
      setMessage("Uložení není dostupné. Změna platí jen do opuštění této sekce.");
    }
  };
  return (
    <form className="panel settings-panel [&_label]:text-sm [&_legend]:text-sm! [&_strong]:text-sm! [&_small]:text-sm! [&_select]:min-h-11 [&_select]:text-sm! [&_input]:min-h-11 [&_input]:text-sm!"
      onSubmit={(event) => event.preventDefault()}>
      <div className="settings-heading"><h2>Cíle a tréninkový plán</h2><p className="text-sm!">Nastav si hlavní cíl, zkušenosti a časové možnosti.</p></div>
      <fieldset className="choice-section">
        <legend>Hlavní cíl</legend>
        <div className="choice-grid">
          {[
            ["Nabírání svalů", "Budování svalové hmoty a síly"],
            ["Redukce hmotnosti", "Snížení tuku a udržení svalů"],
            ["Udržení hmotnosti", "Stabilní váha a zdravý pohyb"],
            ["Zlepšení kondice", "Výdrž, energie a zdraví"],
          ].map(([name, description]) => (
            <label className={`choice-card relative focus-within:ring-2 focus-within:ring-violet-500 ${draft.goal === name ? "selected" : ""}`} key={name}>
              <input checked={draft.goal === name} onChange={() => update("goal", name)} name="goal" type="radio" value={name} />
              <span className="choice-check">{draft.goal === name && <Icon name="check" size={13} />}</span>
              <span><strong>{name}</strong><small>{description}</small></span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="form-grid settings-form-gap">
        <label><span className="text-sm!">Tréninková úroveň</span><select value={draft.level} onChange={(event) => update("level", event.target.value)}><option value="beginner">Začátečník</option><option value="intermediate">Středně pokročilý</option><option value="advanced">Pokročilý</option></select></label>
        <label><span className="text-sm!">Počet tréninků týdně</span><select value={draft.days} onChange={(event) => update("days", event.target.value)}>{[2, 3, 4, 5, 6].map((days) => <option key={days}>{days}</option>)}</select></label>
        <label><span className="text-sm!">Cílová hmotnost (kg)</span><input type="number" min="30" max="300" step="0.1" required value={draft.weight} onChange={(event) => update("weight", event.target.value)} /></label>
        <label><span className="text-sm!">Délka tréninku</span><select value={draft.duration} onChange={(event) => update("duration", event.target.value)}>{[45, 60, 75, 90].map((duration) => <option value={duration} key={duration}>{duration} minut</option>)}</select></label>
      </div>
      <fieldset className="choice-section equipment">
        <legend>Dostupné vybavení</legend>
        <div className="chip-options">
          {["Plně vybavená posilovna", "Jednoručky", "Velká činka", "Kladky", "Vlastní váha"].map((item) => (
            <label key={item} className="relative rounded-full focus-within:ring-2 focus-within:ring-violet-500">
              <input type="checkbox" checked={draft.equipment.includes(item)} onChange={() => update("equipment", draft.equipment.includes(item) ? draft.equipment.filter((value) => value !== item) : [...draft.equipment, item])} />
              <span className="min-h-11! text-sm!"><Icon name="check" size={14} />{item}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="mt-5 text-sm text-slate-600">Změny se ukládají automaticky pouze v tomto prohlížeči. Existující tréninky se automaticky nepřepisují.</p>
      <p role="status" className="mt-3 text-sm">{message}</p>
    </form>
  );
}

function AutoSettingsPanel({ section, children }: { section: string; children: React.ReactNode }) {
  const panel = useRef<HTMLElement>(null);
  const [message, setMessage] = useState("");
  const storageKey = `fitplanner-settings-${section}`;
  useLayoutEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "null");
      if (!Array.isArray(stored)) return;
      panel.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select").forEach((field, index) => {
        const value = stored[index];
        if (field instanceof HTMLInputElement && field.type === "checkbox") {
          if (typeof value === "boolean") field.checked = value;
        } else if (typeof value === "string") field.value = value;
      });
    } catch {
      setMessage("Úložiště není dostupné. Změny mohou platit jen po dobu otevření této sekce.");
    }
  }, [storageKey]);
  return (
    <article ref={panel} className="panel settings-panel" onChange={() => {
      const values = Array.from(panel.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select") ?? [])
        .map((field) => field instanceof HTMLInputElement && field.type === "checkbox" ? field.checked : field.value);
      try {
        localStorage.setItem(storageKey, JSON.stringify(values));
        setMessage("Změna byla automaticky uložena v tomto prohlížeči.");
      } catch {
        setMessage("Změnu se nepodařilo uložit. Platí jen do opuštění této sekce.");
      }
    }}>
      {children}
      <p className="mt-5 text-sm text-slate-600" role="status">
        {message || "Změny se ukládají automaticky pouze v tomto prohlížeči."}
      </p>
    </article>
  );
}

const darkThemeClasses = [
  "bg-[#141218]! text-slate-100 [&_*]:border-[#433c4e]!",
  "[&_:is(.panel,.metric-card,.stat-card,.week-strip,.workout-day-card,.workout-modal,.assistant-drawer)]:bg-[#211d28]!",
  "[&_:is(.plan-overview,.workout-detail-hero)]:bg-none!",
  "[&_:is(input,select,.segmented,.outline-button,.outline-small,.search-button,.icon-button,.library-card,.conversation-body,.ai-compose,.assistant-input,.database-search,.library-search,.settings-actions,.quiet-hours)]:bg-[#2b2534]!",
  "[&_:is(.chat-bubble,.ai-message,.segmented_button.selected,.settings-nav_button.active)]:bg-[#342b42]!",
  "[&_:is(.choice-card.selected,.chip-options_input:checked+span,.meal-nutrition-grid>div,.ingredient-section_span,.detail-stats_span,.rest-pill,kbd)]:bg-[#342b42]!",
  "[&_:is(.donut,.calorie-ring)]:after:bg-[#211d28]!",
  "[&_:is(h1,h2,h3,strong,input,select,.exercise-weight,.day-button,.segmented_button,.settings-nav_button,.outline-small,.outline-button,.choice-section_legend,.form-grid_label>span)]:text-slate-100!",
  "[&_:is(p,small,.subtitle,.workout-meta,.macro-list_span,.meal-main>span,.goal-numbers,.macro-progress>span,.history-row,.history-head,.chart-y,.chart-labels,.legend,.bar-chart_span,.text-slate-600,.text-slate-700)]:text-slate-300!",
  "[&_:is(.ghost-button,.card-link,.back-button,.section-label,.eyebrow,.detail-exercise-main>span,.library-card_div>span)]:text-violet-300!",
  "[&_:is(.metric-icon,.meal-icon,.library-icon,.day-tile,.detail-exercise-number,.muscle-visual)]:bg-[#382c4b]!",
  "[&_:is(.metric-icon,.meal-icon,.library-icon,.day-tile,.detail-exercise-number,.muscle-visual)]:text-violet-200!",
  "[&_:is(.trend,.delta)]:bg-[#193e30]! [&_:is(.trend,.delta)]:text-emerald-200!",
  "[&_.line-chart]:bg-[repeating-linear-gradient(to_bottom,#433c4e_0_1px,transparent_1px_63px)]!",
].join(" ");

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try { return localStorage.getItem("fitplanner-theme") === "dark" ? "dark" : "light"; }
    catch { return "light"; }
  });
  const [themeMessage, setThemeMessage] = useState("");
  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    document.body.style.backgroundColor = theme === "dark" ? "#141218" : "#f7f6f3";
  }, [theme]);
  function changeTheme(next: "light" | "dark") {
    setTheme(next);
    try {
      localStorage.setItem("fitplanner-theme", next);
      setThemeMessage("Vzhled byl uložen v tomto prohlížeči.");
    } catch {
      setThemeMessage("Vzhled je změněn pouze pro tuto relaci; úložiště není dostupné.");
    }
  }
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [settingsTab, setSettingsTab] = useState("profile");
  const [selectedDay, setSelectedDay] = useState(16);
  const [completed, setCompleted] = useState<number[]>([0]);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [aiText, setAiText] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [workoutTab, setWorkoutTab] = useState<"plan" | "history" | "library">("plan");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>(workoutPlan);
  const [newWorkoutOpen, setNewWorkoutOpen] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [newWorkoutDay, setNewWorkoutDay] = useState("SO");
  const [newWorkoutFocus, setNewWorkoutFocus] = useState("");
  const [libraryQuery, setLibraryQuery] = useState("");
  const [mealsByDay, setMealsByDay] = useState<Record<number, Meal[]>>(initialMealsByDay);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [addMealOpen, setAddMealOpen] = useState(false);
  const [foodDatabaseOpen, setFoodDatabaseOpen] = useState(false);
  const [foodQuery, setFoodQuery] = useState("");
  const [newMealName, setNewMealName] = useState("Svačina");
  const [newMealDetail, setNewMealDetail] = useState("");
  const [newMealTime, setNewMealTime] = useState("15:00");
  const [newMealKcal, setNewMealKcal] = useState("350");
  const dateLabel = useMemo(
    () => week.find((item) => item.date === selectedDay)?.day ?? "ST",
    [selectedDay],
  );

  function toggleExercise(index: number) {
    setCompleted((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  }

  function sendAiCommand() {
    if (!aiText.trim()) return;
    setAiReply(
      "Hotovo. Trénink jsem upravil podle tvého požadavku a zachoval celkový týdenní objem.",
    );
    setAiText("");
  }

  function createWorkout() {
    if (!newWorkoutName.trim()) return;
    const workout: Workout = {
      day: newWorkoutDay,
      title: newWorkoutName.trim(),
      meta: "0 cviků · nový trénink",
      state: "Naplánováno",
      tone: "",
      focus: newWorkoutFocus.trim() || "Vlastní tréninkový cíl",
      exercises: [],
    };
    setWorkouts((current) => [...current, workout]);
    setNewWorkoutName("");
    setNewWorkoutFocus("");
    setNewWorkoutOpen(false);
    setWorkoutTab("plan");
    setSelectedWorkout(workout);
  }

  function openAddMeal(food?: (typeof foodDatabase)[number]) {
    if (food) {
      setNewMealDetail(food.name);
      setNewMealKcal(String(food.kcal));
    }
    setFoodDatabaseOpen(false);
    setAddMealOpen(true);
  }

  function createMeal() {
    if (!newMealDetail.trim()) return;
    const kcal = Math.max(0, Number(newMealKcal) || 0);
    const meal: Meal = {
      id: `custom-${Date.now()}`,
      name: newMealName,
      detail: newMealDetail.trim(),
      kcal,
      time: newMealTime,
      protein: Math.round(kcal * 0.075),
      carbs: Math.round(kcal * 0.1),
      fat: Math.round(kcal * 0.03),
      ingredients: [newMealDetail.trim()],
      description: "Vlastní jídlo přidané do tvého denního jídelníčku.",
    };
    setMealsByDay((current) => ({
      ...current,
      [selectedDay]: [...(current[selectedDay] ?? []), meal].sort((a, b) => a.time.localeCompare(b.time)),
    }));
    setNewMealDetail("");
    setNewMealKcal("350");
    setAddMealOpen(false);
    setSelectedMeal(meal);
  }

  return (
    <div className={`app-shell overflow-x-hidden [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-violet-500 [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-violet-500 [&_select:focus-visible]:outline-2 [&_select:focus-visible]:outline-violet-500 ${theme === "dark" ? darkThemeClasses : ""}`}>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark"><Icon name="activity" size={22} /></span>
          <span>FitPlanner</span>
        </div>
        <nav className="nav-list" aria-label="Hlavní navigace">
          <Button className={`nav-item ${activePage === "dashboard" ? "active" : ""}`} onClick={() => setActivePage("dashboard")}><Icon name="home" />Přehled</Button>
          <Button className={`nav-item ${activePage === "workouts" ? "active" : ""}`} onClick={() => setActivePage("workouts")}><Icon name="dumbbell" />Tréninky</Button>
          <Button className={`nav-item ${activePage === "meals" ? "active" : ""}`} onClick={() => setActivePage("meals")}><Icon name="food" />Jídelníček</Button>
          <Button className={`nav-item ${activePage === "stats" ? "active" : ""}`} onClick={() => setActivePage("stats")}><Icon name="chart" />Statistiky</Button>
          <Button className={`nav-item ${activePage === "ai" ? "active" : ""}`} onClick={() => setActivePage("ai")}><Icon name="bot" />AI asistent<span className="nav-badge">AI</span></Button>
          <Button className={`nav-item mobile-settings ${activePage === "settings" ? "active" : ""}`} onClick={() => setActivePage("settings")}><Icon name="settings" />Nastavení</Button>
        </nav>
        <div className="sidebar-bottom">
          <Button className={`nav-item ${activePage === "settings" ? "active" : ""}`} onClick={() => setActivePage("settings")}><Icon name="settings" />Nastavení</Button>
          <div className="profile-mini">
            <span className="avatar">JN</span>
            <span><strong>Jan Novák</strong><small>Nabírání svalů</small></span>
            <Icon name="chevron" size={17} />
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">{pageCopy[activePage].eyebrow}</p>
            <h1>{pageCopy[activePage].title}</h1>
            <p className="subtitle">{pageCopy[activePage].subtitle}</p>
          </div>
          <div className="top-actions">
            <Button className="search-button"><Icon name="search" size={18} /><span>Hledat</span><kbd>⌘ K</kbd></Button>
            <Button className="icon-button" onClick={() => setAssistantOpen(true)}><Icon name="sparkles" /></Button>
          </div>
        </header>

        {activePage === "dashboard" && <>
        <section className="week-strip" aria-label="Výběr dne">
          <Button className="week-arrow"><Icon name="arrow" size={17} /></Button>
          {week.map((item) => (
            <Button
              className={`day-button ${selectedDay === item.date ? "selected" : ""}`}
              key={item.date}
              onClick={() => setSelectedDay(item.date)}
            >
              <span>{item.day}</span>
              <strong>{item.date}</strong>
              {[14, 16, 18].includes(item.date) && <i />}
            </Button>
          ))}
          <Button className="week-arrow next"><Icon name="arrow" size={17} /></Button>
        </section>

        <section className="metrics-grid">
          <article className="metric-card">
            <span className="metric-icon purple"><Icon name="dumbbell" /></span>
            <div><p>Tréninky tento týden</p><strong>2 <small>/ 4</small></strong></div>
            <div className="mini-bars">{[0, 1, 2, 3].map((item) => <i key={item} />)}</div>
          </article>
          <article className="metric-card">
            <span className="metric-icon orange"><Icon name="activity" /></span>
            <div><p>Dnešní aktivita</p><strong>6 420 <small>kroků</small></strong></div>
            <span className="trend">+12 %</span>
          </article>
          <article className="metric-card">
            <span className="metric-icon green"><Icon name="chart" /></span>
            <div><p>Aktuální hmotnost</p><strong>82,4 <small>kg</small></strong></div>
            <span className="delta">−0,6 kg</span>
          </article>
        </section>

        <section className="content-grid">
          <article className="panel workout-panel">
            <div className="panel-heading">
              <div><span className="section-label">DNEŠNÍ TRÉNINK · {dateLabel}</span><h2>Hrudník & triceps</h2></div>
              <Button className="ghost-button">Detail plánu <Icon name="arrow" size={16} /></Button>
            </div>
            <div className="workout-meta">
              <span><Icon name="clock" size={17} /> 55 min</span>
              <span><Icon name="dumbbell" size={17} /> 13 sérií</span>
              <span><Icon name="activity" size={17} /> Střední intenzita</span>
            </div>
            <div className="exercise-list">
              {exercises.map((exercise, index) => {
                const done = completed.includes(index);
                return (
                  <div className={`exercise-row ${done ? "done" : ""}`} key={exercise.name}>
                    <Button className="check-button" onClick={() => toggleExercise(index)}>
                      {done && <Icon name="check" size={16} />}
                    </Button>
                    <span className="exercise-number">{String(index + 1).padStart(2, "0")}</span>
                    <div className="exercise-name"><strong>{exercise.name}</strong><small>{exercise.sets} · {exercise.reps}</small></div>
                    <strong className="exercise-weight">{exercise.weight}</strong>
                    <Button className="row-arrow"><Icon name="arrow" size={17} /></Button>
                  </div>
                );
              })}
            </div>
            <Button className="primary-button" onClick={() => setCompleted([0, 1, 2, 3])}>
              <Icon name="dumbbell" size={18} /> Zahájit trénink
            </Button>
          </article>

          <div className="right-column">
            <article className="panel nutrition-panel">
              <div className="panel-heading compact">
                <div><span className="section-label">VÝŽIVA</span><h2>Dnešní přehled</h2></div>
                <Button className="more-button">•••</Button>
              </div>
              <div className="calorie-summary">
                <div className="calorie-ring"><span><strong>1 720</strong><small>z 2 600 kcal</small></span></div>
                <div className="macro-list">
                  <div><span><i className="protein" />Bílkoviny</span><strong>108 <small>/ 160 g</small></strong></div>
                  <div><span><i className="carbs" />Sacharidy</span><strong>184 <small>/ 300 g</small></strong></div>
                  <div><span><i className="fats" />Tuky</span><strong>52 <small>/ 75 g</small></strong></div>
                </div>
              </div>
              <div className="meal-list">
                {meals.map((meal, index) => (
                  <div className="meal-row" key={meal.name}>
                    <span className={`meal-icon meal-${index}`}><Icon name="food" size={17} /></span>
                    <div><strong>{meal.name}</strong><small>{meal.detail}</small></div>
                    <span><strong>{meal.kcal} kcal</strong><small>{meal.time}</small></span>
                  </div>
                ))}
              </div>
              <Button className="outline-button"><Icon name="plus" size={17} /> Přidat jídlo</Button>
            </article>
          </div>
        </section>

        <section className="ai-banner">
          <span className="ai-symbol"><Icon name="sparkles" size={23} /></span>
          <div><span className="section-label">FITPLANNER AI</span><h3>Potřebuješ upravit svůj plán?</h3><p>Řekni asistentovi, co se změnilo. Trénink i jídelníček přizpůsobí během pár vteřin.</p></div>
          <Button className="ai-button" onClick={() => setAssistantOpen(true)}>Otevřít asistenta <Icon name="arrow" size={16} /></Button>
        </section>
        </>}

        {activePage === "workouts" && (
          <section className="page-content">
            <div className="page-toolbar">
              <div className="segmented">
                <Button className={workoutTab === "plan" ? "selected" : ""} onClick={() => { setWorkoutTab("plan"); setSelectedWorkout(null); }}>Týdenní plán</Button>
                <Button className={workoutTab === "history" ? "selected" : ""} onClick={() => { setWorkoutTab("history"); setSelectedWorkout(null); }}>Historie</Button>
                <Button className={workoutTab === "library" ? "selected" : ""} onClick={() => { setWorkoutTab("library"); setSelectedWorkout(null); }}>Knihovna cviků</Button>
              </div>
              <Button className="accent-button" onClick={() => setNewWorkoutOpen(true)}><Icon name="plus" size={17} /> Nový trénink</Button>
            </div>

            {selectedWorkout ? (
              <div className="workout-detail">
                <Button className="back-button" onClick={() => setSelectedWorkout(null)}><Icon name="arrow" size={16} /> Zpět na {workoutTab === "history" ? "historii" : "plán"}</Button>
                <article className="panel workout-detail-hero">
                  <div className="detail-day">{selectedWorkout.day}</div>
                  <div>
                    <span className="section-label">{selectedWorkout.state.toUpperCase()}</span>
                    <h2>{selectedWorkout.title}</h2>
                    <p>{selectedWorkout.focus}</p>
                  </div>
                  <div className="detail-stats"><span><Icon name="clock" size={16} />{selectedWorkout.meta.split(" · ")[1]}</span><span><Icon name="dumbbell" size={16} />{selectedWorkout.exercises.length} cviků</span></div>
                </article>
                <article className="panel workout-exercises-panel">
                  <div className="panel-heading">
                    <div><span className="section-label">PRŮBĚH TRÉNINKU</span><h2>Seznam cviků</h2></div>
                    <span className="exercise-count">{selectedWorkout.exercises.length} položek</span>
                  </div>
                  {selectedWorkout.exercises.length ? (
                    <div className="detail-exercise-list">
                      {selectedWorkout.exercises.map((exercise, index) => (
                        <div className="detail-exercise" key={exercise.name}>
                          <span className="detail-exercise-number">{String(index + 1).padStart(2, "0")}</span>
                          <div className="detail-exercise-main">
                            <strong>{exercise.name}</strong>
                            <span>{exercise.prescription}</span>
                            <p>{exercise.description}</p>
                          </div>
                          <span className="rest-pill"><Icon name="clock" size={14} /> Pauza {exercise.rest}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-workout"><span className="metric-icon purple"><Icon name="dumbbell" /></span><h3>Trénink zatím nemá cviky</h3><p>Vyber cviky z knihovny a sestav si vlastní trénink.</p><Button className="outline-small" onClick={() => { setWorkoutTab("library"); setSelectedWorkout(null); }}>Otevřít knihovnu cviků</Button></div>
                  )}
                </article>
              </div>
            ) : workoutTab === "plan" ? (
              <>
                <div className="plan-overview panel">
                  <div>
                    <span className="section-label">AKTUÁLNÍ PROGRAM</span>
                    <h2>Upper / Lower split</h2>
                    <p>{workouts.length} tréninky týdně · 8 týdnů · zaměření na hypertrofii</p>
                  </div>
                  <div className="plan-progress"><span><strong>3.</strong> týden z 8</span><div><i /></div></div>
                </div>
                <div className="workout-days-grid">
                  {workouts.map((workout, index) => (
                    <article className={`workout-day-card ${workout.tone}`} key={`${workout.day}-${workout.title}-${index}`}>
                      <div className="workout-card-top"><span className="day-tile">{workout.day}</span><span className="state-pill">{workout.state}</span></div>
                      <h3>{workout.title}</h3><p>{workout.meta}</p>
                      <div className="muscle-visual"><Icon name="dumbbell" size={32} /></div>
                      <Button className="card-link" onClick={() => setSelectedWorkout(workout)}>{workout.tone === "today" ? "Otevřít trénink" : "Zobrazit detail"} <Icon name="arrow" size={15} /></Button>
                    </article>
                  ))}
                </div>
                <div className="panel exercise-library">
                  <div className="panel-heading">
                    <div><span className="section-label">RYCHLÝ PŘEHLED</span><h2>Poslední tréninky</h2></div>
                    <Button className="ghost-button" onClick={() => setWorkoutTab("history")}>Celá historie <Icon name="arrow" size={16} /></Button>
                  </div>
                  <div className="history-table">
                    <div className="history-head"><span>Trénink</span><span>Datum</span><span>Objem</span><span>Trvání</span><span>Hodnocení</span></div>
                    {[
                      ["Hrudník & triceps", "14. října", "6 840 kg", "58 min", "Skvělý"],
                      ["Nohy & core", "11. října", "9 240 kg", "72 min", "Dobrý"],
                      ["Záda & biceps", "9. října", "7 120 kg", "64 min", "Skvělý"],
                    ].map((row) => <Button className="history-row history-row-button" key={row[1]} onClick={() => setSelectedWorkout(workoutPlan.find((item) => item.title === row[0]) ?? workoutPlan[0])}>{row.map((cell) => <span key={cell}>{cell}</span>)}</Button>)}
                  </div>
                </div>
              </>
            ) : workoutTab === "history" ? (
              <article className="panel history-page">
                <div className="panel-heading"><div><span className="section-label">TVŮJ PROGRES</span><h2>Historie tréninků</h2></div><span className="history-summary">12 tréninků za posledních 30 dní</span></div>
                <div className="history-table">
                  <div className="history-head"><span>Trénink</span><span>Datum</span><span>Objem</span><span>Trvání</span><span>Hodnocení</span></div>
                  {[
                    ["Hrudník & triceps", "14. října", "6 840 kg", "58 min", "Skvělý"],
                    ["Nohy & core", "11. října", "9 240 kg", "72 min", "Dobrý"],
                    ["Záda & biceps", "9. října", "7 120 kg", "64 min", "Skvělý"],
                    ["Ramena & ruce", "6. října", "4 980 kg", "61 min", "Dobrý"],
                    ["Hrudník & triceps", "3. října", "6 520 kg", "56 min", "Skvělý"],
                    ["Nohy & core", "30. září", "8 940 kg", "69 min", "Dobrý"],
                  ].map((row) => <Button className="history-row history-row-button" key={`${row[0]}-${row[1]}`} onClick={() => setSelectedWorkout(workoutPlan.find((item) => item.title === row[0]) ?? workoutPlan[0])}>{row.map((cell) => <span key={cell}>{cell}</span>)}</Button>)}
                </div>
              </article>
            ) : (
              <article className="panel library-page">
                <div className="library-header">
                  <div><span className="section-label">DATABÁZE CVIKŮ</span><h2>Knihovna cviků</h2><p>Technika a doporučení pro cviky ve tvém plánu.</p></div>
                  <label className="library-search"><Icon name="search" size={17} /><input aria-label="Hledat cvik" onChange={(event) => setLibraryQuery(event.target.value)} placeholder="Hledat cvik…" value={libraryQuery} /></label>
                </div>
                <div className="library-grid">
                  {exerciseLibrary.filter((exercise) => exercise.name.toLocaleLowerCase("cs").includes(libraryQuery.toLocaleLowerCase("cs"))).map((exercise) => (
                    <article className="library-card" key={exercise.name}>
                      <span className="library-icon"><Icon name="dumbbell" size={21} /></span>
                      <div><h3>{exercise.name}</h3><span>{exercise.prescription}</span><p>{exercise.description}</p></div>
                    </article>
                  ))}
                </div>
              </article>
            )}
          </section>
        )}

        {activePage === "meals" && (
          <section className="page-content">
            <div className="meal-page-grid">
              <div>
                <div className="week-strip compact-week" aria-label="Výběr dne jídelníčku">
                  {week.map((item) => (
                    <Button className={`day-button ${selectedDay === item.date ? "selected" : ""}`} key={item.date} onClick={() => { setSelectedDay(item.date); setSelectedMeal(null); }}>
                      <span>{item.day}</span><strong>{item.date}</strong>
                    </Button>
                  ))}
                </div>
                {selectedMeal ? (
                  <article className="panel meal-detail-panel">
                    <Button className="back-button" onClick={() => setSelectedMeal(null)}><Icon name="arrow" size={16} /> Zpět na jídelníček</Button>
                    <div className="meal-detail-hero">
                      <span className="meal-detail-icon"><Icon name="food" size={25} /></span>
                      <div><span className="section-label">{selectedMeal.time} · {selectedMeal.name.toUpperCase()}</span><h2>{selectedMeal.detail}</h2><p>{selectedMeal.description}</p></div>
                      <strong>{selectedMeal.kcal} <small>kcal</small></strong>
                    </div>
                    <div className="meal-nutrition-grid">
                      {[["Bílkoviny", selectedMeal.protein, "protein"], ["Sacharidy", selectedMeal.carbs, "carbs"], ["Tuky", selectedMeal.fat, "fats"]].map((macro) => (
                        <div key={macro[0]}><i className={String(macro[2])} /><span>{macro[0]}</span><strong>{macro[1]} g</strong></div>
                      ))}
                    </div>
                    <div className="ingredient-section"><span className="section-label">SLOŽENÍ JÍDLA</span><h3>Ingredience</h3><div>{selectedMeal.ingredients.map((ingredient) => <span key={ingredient}><Icon name="check" size={14} />{ingredient}</span>)}</div></div>
                  </article>
                ) : (
                  <article className="panel daily-meals">
                    <div className="panel-heading">
                      <div><span className="section-label">{dateLabel} {selectedDay}. ŘÍJNA</span><h2>{selectedDay === 16 ? "Dnešní jídla" : "Naplánovaná jídla"}</h2></div>
                      <Button className="accent-button" onClick={() => openAddMeal()}><Icon name="plus" size={16} /> Přidat jídlo</Button>
                    </div>
                    {(mealsByDay[selectedDay] ?? []).map((meal, index) => (
                      <Button className="meal-detail-row meal-detail-button" key={meal.id} onClick={() => setSelectedMeal(meal)}>
                        <span className={`meal-icon meal-${index % 4}`}><Icon name="food" /></span>
                        <span className="meal-main"><span>{meal.time} · {meal.name}</span><strong>{meal.detail}</strong><small>{meal.ingredients.join(", ")}</small></span>
                        <span className="meal-macros"><strong>{meal.kcal} kcal</strong><small>B {meal.protein} g · S {meal.carbs} g · T {meal.fat} g</small></span>
                        <span className="row-arrow"><Icon name="arrow" size={17} /></span>
                      </Button>
                    ))}
                  </article>
                )}
              </div>
              <aside className="meal-sidebar">
                <article className="panel goal-card">
                  <span className="section-label">DENNÍ CÍL</span><h2>2 600 kcal</h2>
                  <div className="goal-progress"><i /></div>
                  <div className="goal-numbers"><span><strong>{(mealsByDay[selectedDay] ?? []).reduce((sum, meal) => sum + meal.kcal, 0)}</strong> naplánováno</span><span><strong>{Math.max(0, 2600 - (mealsByDay[selectedDay] ?? []).reduce((sum, meal) => sum + meal.kcal, 0))}</strong> zbývá</span></div>
                  {[
                    ["Bílkoviny", (mealsByDay[selectedDay] ?? []).reduce((sum, meal) => sum + meal.protein, 0), 160, "protein"],
                    ["Sacharidy", (mealsByDay[selectedDay] ?? []).reduce((sum, meal) => sum + meal.carbs, 0), 300, "carbs"],
                    ["Tuky", (mealsByDay[selectedDay] ?? []).reduce((sum, meal) => sum + meal.fat, 0), 75, "fats"],
                  ].map((macro) => <div className="macro-progress" key={macro[0]}><span>{macro[0]}<strong>{macro[1]} / {macro[2]} g</strong></span><div><i className={String(macro[3])} data-width={Math.min(100, Math.round(Number(macro[1]) / Number(macro[2]) * 100)) >= 68 ? "69%" : "61%"} /></div></div>)}
                </article>
                <article className="panel food-search-card">
                  <span className="metric-icon orange"><Icon name="search" /></span>
                  <h3>Databáze potravin</h3>
                  <p>Vyhledej potravinu a přidej ji do jídelníčku včetně nutričních hodnot.</p>
                  <Button className="outline-button" onClick={() => setFoodDatabaseOpen(true)}><Icon name="search" size={16} /> Vyhledat potravinu</Button>
                  <small>Data poskytuje OpenFoodFacts</small>
                </article>
              </aside>
            </div>
          </section>
        )}

        {activePage === "stats" && <Statistics />}

        {activePage === "ai" && (
          <section className="page-content ai-page">
            <div className="ai-workspace">
              <div className="ai-conversation panel">
                <div className="conversation-title"><span className="ai-symbol"><Icon name="sparkles" size={21} /></span><div><strong>FitPlanner AI</strong><small><i /> Připraven upravit tvůj plán</small></div><Button className="more-button">•••</Button></div>
                <div className="conversation-body">
                  <div className="assistant-chat-row"><span className="bot-avatar"><Icon name="bot" size={18} /></span><div className="chat-bubble">Ahoj Jane, s čím ti dnes můžu pomoct? Můžu upravit tréninkový plán, jídelníček nebo analyzovat tvůj progres.</div></div>
                  {aiReply && <div className="user-chat-row"><div className="chat-bubble">{aiReply}</div><span className="avatar">JN</span></div>}
                </div>
                <form className="ai-compose" onSubmit={(event) => { event.preventDefault(); sendAiCommand(); }}>
                  <input aria-label="Zpráva pro AI asistenta" value={aiText} onChange={(event) => setAiText(event.target.value)} placeholder="Napiš například: Tento týden můžu cvičit jen 3 dny…" />
                  <Button className="send-button" type="submit"><Icon name="arrow" size={18} /></Button>
                </form>
                <small className="ai-disclaimer">AI může dělat chyby. Důležité změny plánu si vždy zkontroluj.</small>
              </div>
              <aside className="ai-tools">
                <article className="panel">
                  <span className="section-label">RYCHLÉ AKCE</span>
                  <div className="quick-actions">
                    {[
                      ["dumbbell", "Upravit trénink", "Změnit dny nebo cviky", "Tento týden můžu cvičit jen pondělí, středu a pátek."],
                      ["food", "Upravit jídelníček", "Nahradit jídlo nebo surovinu", "Nemám kuřecí maso, nahraď ho v dnešním obědě."],
                      ["chart", "Analyzovat progres", "Shrnutí výkonů a trendů", "Jak se změnil můj bench press za poslední měsíc?"],
                    ].map((action) => <Button className="quick-action" key={action[1]} onClick={() => setAiText(action[3])}><span className="metric-icon purple"><Icon name={action[0] as IconName} /></span><span><strong>{action[1]}</strong><small>{action[2]}</small></span><Icon name="arrow" size={16} /></Button>)}
                  </div>
                </article>
                <article className="panel recent-changes"><span className="section-label">POSLEDNÍ ZMĚNY</span><h3>Historie asistenta</h3><div><i className="success-icon"><Icon name="check" size={13} /></i><span><strong>Přesunutý trénink</strong><small>Pondělí → úterý · před 2 dny</small></span></div><div><i className="success-icon"><Icon name="check" size={13} /></i><span><strong>Upravená snídaně</strong><small>−120 kcal · před 4 dny</small></span></div></article>
              </aside>
            </div>
          </section>
        )}

        {activePage === "settings" && (
          <section className="page-content settings-page">
            <div className="settings-layout">
              <nav className="settings-nav" aria-label="Navigace nastavení">
                {[
                  ["profile", "user", "Osobní údaje"],
                  ["goals", "activity", "Cíle a plán"],
                  ["nutrition", "food", "Stravování"],
                  ["notifications", "calendar", "Oznámení"],
                ].map((item) => (
                  <Button className={settingsTab === item[0] ? "active" : ""} key={item[0]} onClick={() => setSettingsTab(item[0])}>
                    <Icon name={item[1] as IconName} size={18} /><span>{item[2]}</span><Icon name="arrow" size={15} />
                  </Button>
                ))}
              </nav>

              <div className="settings-content">
                <article className="panel mb-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div><h2 className="text-lg">Vzhled aplikace</h2><p className="mt-1 text-sm text-slate-600">Světlý nebo tmavý režim pro všechny stránky.</p></div>
                    <div className="segmented" role="group" aria-label="Vzhled aplikace">
                      {([{ value: "light", label: "Light · Světlý" }, { value: "dark", label: "Dark · Tmavý" }] as const).map((option) => (
                        <button type="button" key={option.value} aria-pressed={theme === option.value} onClick={() => changeTheme(option.value)}
                          className={`min-h-11! text-sm! ${theme === option.value ? "selected" : ""}`}>{option.label}</button>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600" role="status">{themeMessage || "Volba vzhledu se ukládá automaticky v tomto prohlížeči."}</p>
                </article>
                {settingsTab === "profile" && (
                  <AutoSettingsPanel section="profile">
                    <div className="settings-heading"><div><h2>Osobní údaje</h2><p>Tyto údaje používáme k výpočtu tvého plánu a doporučení.</p></div></div>
                    <div className="profile-editor">
                      <span className="settings-avatar">JN</span>
                      <div><strong>Profilová fotografie</strong><small>PNG nebo JPG, maximálně 5 MB</small></div>
                      <Button className="outline-small">Změnit fotografii</Button>
                    </div>
                    <div className="form-grid">
                      <label><span>Jméno</span><input defaultValue="Jan" /></label>
                      <label><span>Příjmení</span><input defaultValue="Novák" /></label>
                      <label className="form-wide"><span>E-mailová adresa</span><input defaultValue="jan.novak@example.com" type="email" /></label>
                      <label><span>Datum narození</span><input defaultValue="1996-04-12" type="date" /></label>
                      <label><span>Pohlaví</span><select defaultValue="male"><option value="male">Muž</option><option value="female">Žena</option><option value="other">Jiné</option></select></label>
                      <label><span>Výška</span><div className="unit-input"><input defaultValue="184" inputMode="numeric" /><small>cm</small></div></label>
                      <label><span>Aktuální hmotnost</span><div className="unit-input"><input defaultValue="82.4" inputMode="decimal" /><small>kg</small></div></label>
                    </div>
                  </AutoSettingsPanel>
                )}

                {settingsTab === "goals" && <GoalsSettings />}

                {settingsTab === "nutrition" && (
                  <AutoSettingsPanel section="nutrition">
                    <div className="settings-heading"><div><h2>Stravovací preference</h2><p>Pomoz nám sestavit jídelníček, který ti opravdu vyhovuje.</p></div></div>
                    <div className="nutrition-target">
                      <span className="metric-icon orange"><Icon name="food" /></span>
                      <div><strong>Automaticky vypočítaný denní cíl</strong><small>Podle cíle, hmotnosti a aktivity</small></div>
                      <strong>2 600 kcal</strong>
                    </div>
                    <div className="form-grid settings-form-gap">
                      <label><span>Typ stravování</span><select defaultValue="standard"><option value="standard">Bez omezení</option><option>Vegetariánské</option><option>Veganské</option><option>Low carb</option></select></label>
                      <label><span>Počet jídel denně</span><select defaultValue="5"><option>3</option><option>4</option><option>5</option><option>6</option></select></label>
                      <label className="form-wide"><span>Alergie a potraviny, kterým se chceš vyhnout</span><input placeholder="Např. arašídy, laktóza…" /></label>
                    </div>
                    <fieldset className="choice-section equipment">
                      <legend>Preferované zdroje bílkovin</legend>
                      <div className="chip-options">{["Kuřecí maso", "Ryby", "Hovězí maso", "Vejce", "Mléčné výrobky", "Luštěniny"].map((item, index) => <label key={item}><input defaultChecked={[0, 1, 3, 4].includes(index)} type="checkbox" /><span><Icon name="check" size={12} />{item}</span></label>)}</div>
                    </fieldset>
                  </AutoSettingsPanel>
                )}

                {settingsTab === "notifications" && (
                  <AutoSettingsPanel section="notifications">
                    <div className="settings-heading"><div><h2>Oznámení</h2><p>Vyber si, co a kdy ti má FitPlanner připomenout.</p></div></div>
                    <div className="toggle-list">
                      {[
                        ["Připomenutí tréninku", "Upozornění 60 minut před naplánovaným tréninkem", true],
                        ["Denní přehled jídelníčku", "Ranní souhrn dnešních jídel a nutričních cílů", true],
                        ["Týdenní vyhodnocení", "Souhrn progresu každou neděli večer", true],
                        ["Tipy od AI asistenta", "Personalizovaná doporučení podle tvých výsledků", false],
                        ["Novinky a aktualizace", "Informace o nových funkcích aplikace", false],
                      ].map((setting) => <label className="toggle-row" key={String(setting[0])}><span><strong>{setting[0]}</strong><small>{setting[1]}</small></span><input defaultChecked={setting[2] as boolean} type="checkbox" /><i /></label>)}
                    </div>
                    <div className="quiet-hours">
                      <span className="metric-icon purple"><Icon name="clock" /></span>
                      <div><strong>Klidový režim</strong><small>Neposílat upozornění mezi</small></div>
                      <select defaultValue="22:00"><option>21:00</option><option>22:00</option><option>23:00</option></select>
                      <span>—</span>
                      <select defaultValue="07:00"><option>06:00</option><option>07:00</option><option>08:00</option></select>
                    </div>
                  </AutoSettingsPanel>
                )}

              </div>
            </div>
          </section>
        )}
      </main>

      {newWorkoutOpen && (
        <div className="modal-overlay" onClick={() => setNewWorkoutOpen(false)}>
          <form className="workout-modal" onClick={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); createWorkout(); }}>
            <div className="modal-head"><div><span className="section-label">VLASTNÍ PLÁN</span><h2>Nový trénink</h2></div><Button className="close-button" onClick={() => setNewWorkoutOpen(false)}>×</Button></div>
            <p className="modal-description">Pojmenuj nový trénink a zařaď ho do svého týdenního plánu.</p>
            <label className="modal-field"><span>Název tréninku</span><input autoFocus onChange={(event) => setNewWorkoutName(event.target.value)} placeholder="Např. Full body" required value={newWorkoutName} /></label>
            <div className="modal-field-row">
              <label className="modal-field"><span>Den</span><select onChange={(event) => setNewWorkoutDay(event.target.value)} value={newWorkoutDay}>{week.map((item) => <option key={item.day}>{item.day}</option>)}</select></label>
              <label className="modal-field"><span>Zaměření</span><input onChange={(event) => setNewWorkoutFocus(event.target.value)} placeholder="Síla, kondice…" value={newWorkoutFocus} /></label>
            </div>
            <div className="modal-actions"><Button className="outline-small" onClick={() => setNewWorkoutOpen(false)}>Zrušit</Button><Button className="accent-button" type="submit"><Icon name="plus" size={16} /> Vytvořit trénink</Button></div>
          </form>
        </div>
      )}

      {addMealOpen && (
        <div className="modal-overlay" onClick={() => setAddMealOpen(false)}>
          <form className="workout-modal" onClick={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); createMeal(); }}>
            <div className="modal-head"><div><span className="section-label">{dateLabel} {selectedDay}. ŘÍJNA</span><h2>Přidat jídlo</h2></div><Button className="close-button" onClick={() => setAddMealOpen(false)}>×</Button></div>
            <p className="modal-description">Přidej vlastní jídlo do vybraného dne. Orientační makra dopočítáme automaticky.</p>
            <div className="modal-field-row meal-form-row">
              <label className="modal-field"><span>Typ jídla</span><select onChange={(event) => setNewMealName(event.target.value)} value={newMealName}><option>Snídaně</option><option>Svačina</option><option>Oběd</option><option>Večeře</option></select></label>
              <label className="modal-field"><span>Čas</span><input onChange={(event) => setNewMealTime(event.target.value)} type="time" value={newMealTime} /></label>
            </div>
            <label className="modal-field meal-name-field"><span>Název jídla nebo potraviny</span><input autoFocus onChange={(event) => setNewMealDetail(event.target.value)} placeholder="Např. Tvaroh s ovocem" required value={newMealDetail} /></label>
            <label className="modal-field meal-name-field"><span>Energetická hodnota</span><input min="0" onChange={(event) => setNewMealKcal(event.target.value)} type="number" value={newMealKcal} /></label>
            <div className="modal-actions"><Button className="outline-small" onClick={() => setAddMealOpen(false)}>Zrušit</Button><Button className="accent-button" type="submit"><Icon name="plus" size={16} /> Přidat do jídelníčku</Button></div>
          </form>
        </div>
      )}

      {foodDatabaseOpen && (
        <div className="modal-overlay" onClick={() => setFoodDatabaseOpen(false)}>
          <div className="workout-modal food-database-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head"><div><span className="section-label">NUTRIČNÍ HODNOTY</span><h2>Databáze potravin</h2></div><Button className="close-button" onClick={() => setFoodDatabaseOpen(false)}>×</Button></div>
            <label className="database-search"><Icon name="search" size={18} /><input autoFocus aria-label="Hledat v databázi potravin" onChange={(event) => setFoodQuery(event.target.value)} placeholder="Hledat potravinu…" value={foodQuery} /></label>
            <div className="food-results">
              {foodDatabase.filter((food) => food.name.toLocaleLowerCase("cs").includes(foodQuery.toLocaleLowerCase("cs"))).map((food) => (
                <div className="food-result" key={food.name}>
                  <span className="meal-icon"><Icon name="food" size={18} /></span>
                  <div><strong>{food.name}</strong><small>{food.unit} · B {food.protein} g · S {food.carbs} g · T {food.fat} g</small></div>
                  <span><strong>{food.kcal}</strong><small>kcal</small></span>
                  <Button className="food-add-button" onClick={() => openAddMeal(food)}><Icon name="plus" size={15} /> Přidat</Button>
                </div>
              ))}
              {!foodDatabase.some((food) => food.name.toLocaleLowerCase("cs").includes(foodQuery.toLocaleLowerCase("cs"))) && <div className="no-food-results">Žádná potravina neodpovídá hledání.</div>}
            </div>
          </div>
        </div>
      )}

      {assistantOpen && (
        <div className="assistant-overlay" onClick={() => setAssistantOpen(false)}>
          <aside className="assistant-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="assistant-head">
              <span className="ai-symbol"><Icon name="sparkles" size={21} /></span>
              <div><strong>FitPlanner AI</strong><small>Online · připraven pomoci</small></div>
              <Button className="close-button" onClick={() => setAssistantOpen(false)}>×</Button>
            </div>
            <div className="assistant-body">
              <div className="ai-message">Ahoj Jane, co dnes potřebuješ upravit? Můžu změnit trénink, jídelníček nebo analyzovat tvůj progres.</div>
              {aiReply && <div className="ai-message reply">{aiReply}</div>}
              <div className="suggestions">
                <Button onClick={() => setAiText("Přesuň pondělní trénink na pátek")}>Přesunout trénink</Button>
                <Button onClick={() => setAiText("Nahraď kuřecí maso v dnešním obědě")}>Nahradit potravinu</Button>
              </div>
            </div>
            <form className="assistant-input" onSubmit={(event) => { event.preventDefault(); sendAiCommand(); }}>
              <input aria-label="Zpráva pro AI asistenta" onChange={(event) => setAiText(event.target.value)} placeholder="Napiš, co chceš změnit…" value={aiText} />
              <Button className="send-button" onClick={sendAiCommand} type="button"><Icon name="arrow" size={18} /></Button>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
