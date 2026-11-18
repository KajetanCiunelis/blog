// Wersja "do pracy": zostają tylko Publikacje i TNR. Znikają linki w nawigacji,
// strona "O mnie" (pod / i /en/ renderują się Publikacje) oraz stopka.
// Blog i Poezja dalej istnieją pod swoimi adresami, są tylko niepodlinkowane.
// Włączenie: PUBLIC_WORK_MODE=true przy buildzie (npm run build:work).
export const WORK_MODE = import.meta.env.PUBLIC_WORK_MODE === 'true';
