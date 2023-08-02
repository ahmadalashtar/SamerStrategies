const day = async () => {
    // Create a new Date object representing the current date and time
    const currentDate = new Date();

    // Adjust the UTC offset to UTC+2
    currentDate.setUTCHours(currentDate.getUTCHours());

    // Get the day number (0 for Sunday, 1 for Monday, etc.) in UTC+2
    const dayNumber = currentDate.getUTCDay();

    // Adjust the numbering to start from Monday as 1 in UTC+2
    const adjustedDayNumber = dayNumber === 0 ? 7 : dayNumber;

    return adjustedDayNumber; // Output will be 1 for Monday, 2 for Tuesday, etc. in UTC+2

}

module.exports = { day }