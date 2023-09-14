export default function formatDateTime(dateHour: string): string {
  const parts = dateHour.split(' ');
  const date = parts[0]
  const hour = parts[1];

  const dateParts = date.split('-');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  return `${day}/${month}/${year} ${hour}`
}