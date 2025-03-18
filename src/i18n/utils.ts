import { ui, defaultLang, showDefaultLang, routes } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    const pathName = path.replaceAll("/", "");
    const routeMap = routes[l as keyof typeof routes] as Record<string, string>;
    const hasTranslation = l !== defaultLang && routeMap && routeMap[pathName];

    let translatedPath;
    if (hasTranslation) {
      translatedPath = `/${routeMap[pathName]}`;
    } else {
      translatedPath = path;
    }

    const shouldOmitLangPrefix = !showDefaultLang && l === defaultLang;
    return shouldOmitLangPrefix ? translatedPath : `/${l}${translatedPath}`;
  };
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = url.pathname;
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "";
  }

  const currentLang = getLangFromUrl(url);

  const isLangSegment = segments[0] === currentLang;
  if (isLangSegment) {
    segments.shift();
  }

  if (segments.length === 0) {
    return "";
  }

  const fullPath = segments.join("/");

  if (currentLang === defaultLang) {
    return fullPath;
  }

  const routeMap = routes[currentLang as keyof typeof routes] as Record<
    string,
    string
  >;
  if (!routeMap) {
    return fullPath;
  }

  const lastSegment = segments[segments.length - 1];
  for (const [originalPath, translatedPath] of Object.entries(routeMap)) {
    if (translatedPath === lastSegment) {
      if (segments.length > 1) {
        const pathPrefix = segments.slice(0, -1).join("/");
        return `${pathPrefix}/${originalPath}`;
      }
      return originalPath;
    }
  }

  return fullPath;
}
