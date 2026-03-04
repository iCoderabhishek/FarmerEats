export const DAYS = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];

export const DURATIONS = [
    '8:00am - 10:00am',
    '10:00am - 1:00pm',
    '1:00pm - 4:00pm',
    '4:00pm - 7:00pm',
    '7:00pm - 10:00pm',
];

export const getDefaultSchedule = (): Record<string, string[]> => ({
    M: ['8:00am - 10:00am', '10:00am - 1:00pm'],
    T: ['1:00pm - 4:00pm', '4:00pm - 7:00pm'],
    W: ['8:00am - 10:00am', '10:00am - 1:00pm'],
});

export const toggleDurationInSchedule = (
    schedule: Record<string, string[]>,
    day: string,
    duration: string
): Record<string, string[]> => {
    const daySchedule = schedule[day] || [];
    if (daySchedule.includes(duration)) {
        return {
            ...schedule,
            [day]: daySchedule.filter((d) => d !== duration),
        };
    } else {
        return { ...schedule, [day]: [...daySchedule, duration] };
    }
};
