// Ajouter ces types à votre fichier types/index.ts

export interface UserSettings {
  openaiApiKey: string;
  database: {
    host: string;
    port: string;
    name: string;
    username: string;
    password: string;
  };
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    title?: string;
    company?: string;
    phone?: string;
  };
}