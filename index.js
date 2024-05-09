import inquirer from 'inquirer';
import chalk from 'chalk';
const runCountDown = async () => {
    let countDownTimes = {
        "Year": 31536000,
        "Month": 2592000,
        "Week": 604800,
        "Day": 86400,
        "Hour": 3600,
        "Minute": 60,
        "Custom": -1,
    };
    let answer = await inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "Choose the duration for the countdown:",
            choices: Object.keys(countDownTimes),
        }
    ]);
    let durationInSeconds = countDownTimes[answer.choice];
    let futureDate;
    if (answer.choice === "Custom") {
        let customAnswer = await inquirer.prompt([
            {
                name: "custom",
                type: "number",
                message: "Enter your desired time in seconds:",
                validate: (input) => {
                    const parsed = parseInt(input, 10);
                    return !isNaN(parsed) && parsed > 0 ? true : 'Please enter a valid number of seconds.';
                }
            }
        ]);
        durationInSeconds = customAnswer.custom;
    }
    let now = new Date();
    futureDate = new Date(now.getTime() + durationInSeconds * 1000);
    const intervalId = setInterval(() => {
        let currentTime = new Date();
        let remainingTime = futureDate.getTime() - currentTime.getTime();
        if (remainingTime <= 0) {
            clearInterval(intervalId);
            console.log(chalk.red.bold("Countdown finished!"));
        }
        else {
            const remainingSeconds = Math.round(remainingTime / 1000);
            process.stdout.write(chalk.yellow(`Time left: ${remainingSeconds} seconds\r`));
        }
    }, 1000);
};
runCountDown();
