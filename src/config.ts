// Wersja "do pracy": strona zawodowa. Pod / i /en/ renderuje się krótkie
// "o mnie" (zdanie, portret, edukacja AWF), w belce zostają Publikacje i link
// do narzędzi TNR, a stopka jest bez GitHuba i Instagrama.
// Blog i Poezja dalej istnieją pod swoimi adresami, są tylko niepodlinkowane.
// Włączenie: PUBLIC_WORK_MODE=true przy buildzie (npm run build:work).
export const WORK_MODE = import.meta.env.PUBLIC_WORK_MODE === 'true';
