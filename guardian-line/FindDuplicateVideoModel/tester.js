const spawner = require('child_process').spawn;

// tester.js
// const mp4Urls = require('/src/app/(logged)/quick_filing/page').mp4Urls;

// Now you can use mp4Urls variable
// console.log(mp4Urls);


const data_to_pass_in = "https://user-images.githubusercontent.com/64683866/168872267-7c6682f8-7294-4d9a-8a68-8c6f44c06df6.mp4"
console.log("Data sent to python Script:", data_to_pass_in);

const python_process = spawner('python', ['./pythonapp.py', data_to_pass_in]);

python_process.stdout.on('data', (data) => {
    console.log('Data Received from python script', data.toString());
});