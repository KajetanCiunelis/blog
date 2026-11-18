// Wersja "do pracy": w nawigacji zostają tylko Publikacje, a rysunek z kotem
// znika ze strony głównej. Podstrony Blog i Poezja dalej istnieją pod swoimi
// adresami, są tylko niepodlinkowane.
// Włączenie: PUBLIC_WORK_MODE=true przy buildzie (npm run build:work).
export const WORK_MODE = import.meta.env.PUBLIC_WORK_MODE === 'true';
