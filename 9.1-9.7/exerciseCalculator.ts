export const calculateExercises = (daily_hours: number[], target: number) => {
    const days = daily_hours.length;
    const training_days = daily_hours.filter(hours => hours !== 0).length;
    
    const sum = daily_hours.reduce((sum, hours) => sum + hours, 0);
    const average = sum/days;

    let rating = 0;
    let ratingDescription = '';

    if (average >= target) {
        rating = 3;
        ratingDescription = 'Good';
    } else if (average >= target / 2) {
        rating = 2;
        ratingDescription = 'Ok';
    } else {
        rating = 1;
        ratingDescription = 'Bad';
    }

    const success = average >= target;

    return (
        {
            periodLength: days,
            trainnigDays: training_days,
            success: success,
            rating: rating,
            ratingDescription: ratingDescription,
            target: target,
            average: average
        }
    );
};

const target: number = Number(process.argv[2]);
const daily_hours: number[] = process.argv.slice(3).map(Number);

console.log(calculateExercises(daily_hours, target));