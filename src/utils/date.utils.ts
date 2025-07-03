

export function formatDateToISO(date: Date) {
    date.setHours(12, 0, 0, 0);
    return date.toISOString()
}