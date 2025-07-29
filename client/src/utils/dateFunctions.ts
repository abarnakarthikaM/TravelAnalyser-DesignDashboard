import dayjs from 'dayjs'

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


// Function to calculate date ranges based on selected filter value
export const  calculateDateValues = (value: any) => {
  // Default start date as empty and end date as today's date
  let startDate = '';
  let endDate = dayjs().format('YYYY-MM-DD');

  switch (value) {
    case 'today':
      startDate = dayjs().format('YYYY-MM-DD');
      endDate = startDate;
      return [startDate, endDate];

    case 'yesterday':
      // Yesterday's date for both start & end
      startDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
      endDate = startDate;
      return ([startDate, endDate]); // update state with yesterday's date

    case 'this-week':
      // Start of the current week to end of the current week
      startDate = dayjs().startOf('week').format('YYYY-MM-DD');
      endDate = dayjs().endOf('week').format('YYYY-MM-DD');
      return ([startDate, endDate]); // update state with week range

    case 'last-week':
      // Start of the previous week to end of the previous week
      startDate = dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD');
      endDate = dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD');
      return ([startDate, endDate]); // update state with last week's range

    case 'this-month':
      // Start of the current month to end of the current month
      startDate = dayjs().startOf('month').format('YYYY-MM-DD');
      endDate = dayjs().endOf('month').format('YYYY-MM-DD');
      return ([startDate, endDate]); // update state with this month's range

    case 'last-month':
      // Start of the previous month to end of the previous month
      startDate = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
      endDate = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
      return ([startDate, endDate]); // update state with last month's range


    default:
      // Reset values if no filter selected
      ([startDate = '',
      endDate = ''])
  }

};