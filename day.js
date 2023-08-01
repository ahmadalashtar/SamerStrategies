const day = async () => {
    const currentDate = new Date();
    // Get the day name
    const dayName = currentDate.toLocaleString('en-US', { weekday: 'long' });
    // Get the day number (0 for Sunday, 1 for Monday, etc.)
    const dayNumber = currentDate.getDay();
    // Adjust the numbering to start from Monday as 1
    const adjustedDayNumber = dayNumber === 0 ? 7 : dayNumber;
    return adjustedDayNumber;
}
module.exports = {day}