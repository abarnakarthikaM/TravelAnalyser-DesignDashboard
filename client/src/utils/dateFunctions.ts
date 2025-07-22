

/**
 * Formats a date into "DD MMM, YYYY" format (e.g., "21 Jul, 2025").
 * @param date - A date input as string, number, or Date object
 * @returns A formatted date string like "01 Jan, 2025"
 */
export const formatDate = (date: string | number | Date): string => {
  // Convert the input to a Date object
  const d = new Date(date);

  // Get day of the month and pad with 0 if needed
  const day = String(d.getDate()).padStart(2, '0');

  // Get short month name like 'Jan', 'Feb', etc.
  const month = d.toLocaleString('en-US', { month: 'short' });

  // Get full year (e.g., 2025)
  const year = d.getFullYear();

  // Return formatted string
  return `${day} ${month}, ${year}`;
};