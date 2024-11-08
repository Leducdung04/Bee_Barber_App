export function getNext7DaysWithWeekdays() {
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const result = [];
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
        const futureDate = new Date();
        futureDate.setDate(currentDate.getDate() + i);
        const dayOfWeek = daysOfWeek[futureDate.getDay()];
        result.push({
            date: futureDate.toISOString().slice(0, 10), // Lấy ngày theo định dạng YYYY-MM-DD
            dayOfWeek: dayOfWeek,
        });
    }
    return result;
}