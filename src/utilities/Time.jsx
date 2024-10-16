// Extract the days and time from a meeting string like "MWF 9:00-9:50"
export function parseMeetingString(meeting) {
    if (!meeting) return { days: [], start: null, end: null };
    
    const [daysPart, timePart] = meeting.split(" ");
    const days = daysPart.match(/[MTuWThFS]/g); // Extract days like M, Tu, W, Th, F
    const [start, end] = timePart.split("-").map(parseTime);
    return { days, start, end };
  }
  
  //Convert a time string like "9:00" or "14:30" to a number representing minutes past midnight
  function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  }
  
  //Check if two time periods overlap
  function timeOverlap(start1, end1, start2, end2) {
    return !(end1 <= start2 || end2 <= start1);
  }
  
  //Check if two classes have any days in common
  function daysOverlap(days1, days2) {
    return days1.some(day => days2.includes(day));
  }
  
  // Check if two meeting strings (representing classes) have a time conflict
  export function hasTimeConflict(meeting1, meeting2) {
    const { days: days1, start: start1, end: end1 } = parseMeetingString(meeting1);
    const { days: days2, start: start2, end: end2 } = parseMeetingString(meeting2);
    
    if (!days1.length || !days2.length) return false; // No conflict if any meeting string is empty
    return daysOverlap(days1, days2) && timeOverlap(start1, end1, start2, end2);
  }
  