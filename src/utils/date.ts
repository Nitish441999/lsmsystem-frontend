import { format, isValid } from "date-fns";

export const formatDateSafe = (date: string | Date | null | undefined) => {
  if (!date) return "—";

  const parsed = typeof date === "string" ? new Date(date) : date;

  if (!isValid(parsed)) return "—";

  return format(parsed, "MMM d, h:mm a");
};
