import { format, isToday, isPast, isFuture, parseISO, startOfDay } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const formatDateShort = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM d');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const isDateToday = (dateString) => {
  if (!dateString) return false;
  
  try {
    const date = parseISO(dateString);
    return isToday(date);
  } catch (error) {
    console.error('Error checking if date is today:', error);
    return false;
  }
};

export const isDatePast = (dateString) => {
  if (!dateString) return false;
  
  try {
    const date = parseISO(dateString);
    return isPast(startOfDay(date)) && !isToday(date);
  } catch (error) {
    console.error('Error checking if date is past:', error);
    return false;
  }
};

export const isDateFuture = (dateString) => {
  if (!dateString) return false;
  
  try {
    const date = parseISO(dateString);
    return isFuture(startOfDay(date));
  } catch (error) {
    console.error('Error checking if date is future:', error);
    return false;
  }
};

export const getDateStatus = (dateString) => {
  if (!dateString) return 'none';
  
  if (isDatePast(dateString)) return 'overdue';
  if (isDateToday(dateString)) return 'today';
  if (isDateFuture(dateString)) return 'upcoming';
  
  return 'none';
};

export const sortTasksByDate = (tasks) => {
  return [...tasks].sort((a, b) => {
    // Tasks without due dates go to the end
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    
    // Sort by due date
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
};

export const groupTasksByDate = (tasks) => {
  const groups = {
    overdue: [],
    today: [],
    upcoming: [],
    noDate: []
  };

  tasks.forEach(task => {
    const status = getDateStatus(task.dueDate);
    if (status === 'overdue') groups.overdue.push(task);
    else if (status === 'today') groups.today.push(task);
    else if (status === 'upcoming') groups.upcoming.push(task);
    else groups.noDate.push(task);
  });
return groups;
};

// Recurring task utilities
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addWeeks = (date, weeks) => {
  return addDays(date, weeks * 7);
};

export const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export const generateRecurringDates = (startDate, endDate, interval, intervalCount = 1) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  
  // Limit to prevent infinite loops (max 2 years of dates)
  const maxDates = 730;
  let count = 0;
  
  while (count < maxDates && (!end || currentDate <= end)) {
    dates.push(format(currentDate, 'yyyy-MM-dd'));
    
    switch (interval) {
      case 'daily':
        currentDate = addDays(currentDate, intervalCount);
        break;
      case 'weekly':
        currentDate = addWeeks(currentDate, intervalCount);
        break;
      case 'monthly':
        currentDate = addMonths(currentDate, intervalCount);
        break;
      default:
        return dates; // Invalid interval, return what we have
    }
    
    count++;
  }
  
  return dates;
};

export const formatRecurringPattern = (interval, intervalCount = 1) => {
  if (intervalCount === 1) {
    switch (interval) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return 'Monthly';
      default:
        return 'Unknown';
    }
  }
  
  switch (interval) {
    case 'daily':
      return `Every ${intervalCount} days`;
    case 'weekly':
      return `Every ${intervalCount} weeks`;
    case 'monthly':
      return `Every ${intervalCount} months`;
    default:
      return 'Unknown';
  }
};