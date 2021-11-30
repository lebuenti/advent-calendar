const fs = require('fs');
const path = require('path');

if (process.argv.length < 4 || process.argv[2] !== '--username' || !process.argv[3] || !process.argv[3] === "") {
    console.error("Usage: node setUpCalendar.js --username <yourUsername>");
    return;
}

const username = process.argv[3];
const imageFolder = "your_images_here/"
const directoryPath = path.join(__dirname, imageFolder);

console.log("Read images from folder " + imageFolder + "...");

const targetPath = path.join(__dirname, "calendar_images/" + username + "/");

if (!fs.existsSync(targetPath)){
    fs.mkdirSync(targetPath);
}

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + directoryPath + ", " + err);
    } 
    if (files.length === 0) return console.error("No images in " + directoryPath + "found.")
    if (files.length < 24) return console.error("Not enough images in " + directoryPath + "found. Must be exactly 24. Actual: " + files.length);
    if (files.length > 24) return console.error("To many images in " + directoryPath + "found. Must be exactly 24. Actual: " + files.length);

    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

    files.forEach(file => {
        const indexDay = Math.floor(Math.random() * (days.length - 1));
        const day = days[indexDay];
        days.splice(indexDay, 1);

        fs.rename(directoryPath + file, targetPath + day + ".jpeg", (error) => {
            if (error) console.error(error);
        }); 
    })
    console.log("Successfully read images. Put them in random order for your calendar \n");

});
