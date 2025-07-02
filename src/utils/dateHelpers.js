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