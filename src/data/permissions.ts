export const permissions = {
  "Wacil Zekraoui": ["ADMIN"],
  "Rayane Ayad": ["ADMIN"],
  "Mohamed Ouali": ["ADMIN"],
  Fawzi: ["Media Buyer"],
};

export const isAdmin = (name: string) => {
  return permissions[name as keyof typeof permissions]?.includes("ADMIN");
};
