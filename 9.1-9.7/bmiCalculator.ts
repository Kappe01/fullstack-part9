
export const calculateBmi = (height: number, weight: number) => {
    const bmi = weight/(height/100)**2;

    if (18.5 < bmi && bmi < 24.9) {
        return 'Normal weight';
    } else if (bmi > 24.9) {
        return 'Overweight';
    } else if (bmi < 18.5) {
        return 'Underweight';
    }
    return NaN;
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBmi(height, weight));