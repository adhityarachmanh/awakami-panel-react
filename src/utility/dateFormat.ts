import moment from "moment";

export function formatDateString(
  date?: string,
  format: string = "DD/MM/YYYY"
): string {
  if (!date) return "-";
  return moment(date).format(format);
}
