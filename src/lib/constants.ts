export const XP_PER_LEVEL = 80000;

export const PLAYSTYLES = [
  {
    id: "casual",
    label: "Casual",
    description: "Focado em Sobreviver",
    xp: 12000,
  },
  {
    id: "regular",
    label: "Equilibrado",
    description: "Lutas casuais + sobrevivência",
    xp: 20000,
  },
  {
    id: "aggressive",
    label: "Agressivo",
    description: "Focado em muitas Kills",
    xp: 30000,
  },
  {
    id: "quester",
    label: "Fazedor de Missões",
    description: "Focado no grind (Diárias/Semanais)",
    xp: 45000,
  },
] as const;

export type PlaystyleId = (typeof PLAYSTYLES)[number]["id"];
