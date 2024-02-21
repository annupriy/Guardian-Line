// NOT FRAUD = Add(Reputation points)
// FRAUD = Add(Reputation points)

// if NOT FRAUD > FRAUD okay
// elxse AI MODEL Result if attachment provided

let numVolunteerSaysFraud;
let numVolunteerSaysNoFraud;
console.log("Enter the number of volunteers saying no: ");
// Assuming input is provided via a function getInput() which returns a Promise
getInput().then(input => {
    numVolunteerSaysFraud = parseInt(input);
    console.log("Enter the number of volunteers saying yes: ");
    return getInput();
}).then(input => {
    numVolunteerSaysNoFraud = parseInt(input);
    let repuFraud = 0;
    let repuNoFraud = 0;
    
    let promises = [];
    for (let i = 0; i < numVolunteerSaysFraud; i++) {
        console.log(`Enter the Reputation points of ${i + 1}th volunteer saying no: `);
        promises.push(getInput().then(input => {
            repuFraud += parseInt(input);
        }));
    }
    return Promise.all(promises).then(() => {
        return { repuFraud, repuNoFraud };
    });
}).then(({ repuFraud, repuNoFraud }) => {
    let promises = [];
    for (let i = 0; i < numVolunteerSaysNoFraud; i++) {
        console.log(`Enter the Reputation points of ${i + 1}th volunteer saying yes: `);
        promises.push(getInput().then(input => {
            repuNoFraud += parseInt(input);
        }));
    }
    return Promise.all(promises).then(() => {
        return { repuFraud, repuNoFraud };
    });
}).then(({ repuFraud, repuNoFraud }) => {
    if (repuNoFraud >= repuFraud) {
        console.log("Not Fraud");
    } else {
        console.log("Enter the Output of AI Model:");
        return getInput().then(input => {
            let outputOfAI = parseInt(input);
            if (outputOfAI === -1) {
                console.log("Fraud");
            } else if (outputOfAI === 0) {
                console.log("Not Fraud");
            } else {
                console.log("Fraud");
            }
        });
    }
});

// Helper function to simulate input
function getInput() {
    // This function should return a Promise that resolves with the input from the user
    // For example, it could be implemented using prompt in a browser environment
    // or using readline in a Node.js environment
    return new Promise(resolve => {
        // Implementation depends on the environment
    });
}

