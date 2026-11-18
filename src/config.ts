// Wersja "do pracy": jedna strona zawodowa. Pod / i /en/ renderuje się profil
// (zdanie o mnie, portret, edukacja AWF) z publikacjami, nawigacja prowadzi do
// sekcji tej strony i do narzędzi TNR, a stopka zostaje bez GitHuba i Instagrama.
// Blog i Poezja dalej istnieją pod swoimi adresami, są tylko niepodlinkowane.
// Włączenie: PUBLIC_WORK_MODE=true przy buildzie (npm run build:work).
export const WORK_MODE = import.meta.env.PUBLIC_WORK_MODE === 'true';
