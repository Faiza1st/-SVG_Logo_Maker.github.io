import('inquirer').then(({ default: inquirer }) => { // Destructure to get the default export
    const fs = require('fs');
    const { logoCreate } = require('./svgGenerator'); // Import the logoCreate function from SVGgenrator.js  

    // creating questions to promt to user to create logo
    const questions = [
        {
            type: 'input',
            name: 'text',
            message: 'Please enter up to three characters: ',
            validate: (input) => {
                //if length is longer than 3 pass error
                if (input.length <= 3) {
                    return true;
                }
                return 'Please enter up to three characters only.';
            }
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Please enter the text color:',
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape for the logo:',
            choices: ['Circle', 'Square', 'Triangle'],
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Please enter the shape color :',
        }
    ];

    // Prompt user for input
    inquirer.prompt(questions).then(answers => {
        // Generate SVG based on user input
        const logo = logoCreate(answers.text, answers.textColor, answers.shape, answers.shapeColor);

        // Write SVG content to file
        fs.writeFile('logo.svg', logo, (err) => {
            if (err) throw err;
            console.log('Generated logo.svg');
        });
    });
});