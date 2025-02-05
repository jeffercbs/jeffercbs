import SpainFlag from "@/components/flags/Spain.astro";
import UnitedStatesFlag from "@/components/flags/UnitedStates.astro";

export const LANGUAGES: Record<
  string,
  { code: string; name: string; flag: typeof SpainFlag }
> = {
  en: {
    code: "en",
    name: "English",
    flag: UnitedStatesFlag,
  },
  es: {
    code: "es",
    name: "Español",
    flag: SpainFlag,
  },
};

export const defaultLang = "es";
export const showDefaultLang = false;

export const ui = {
  es: {},
  en: {},
} as const;

export const routes = {
  es: {
    inicio: "inicio",
    about: "about",
    blog: "blog",
    projects: "proyectos",
  },
  en: {
    home: "home",
    about: "about",
    blog: "blog",
    projects: "projects",
  },
};
