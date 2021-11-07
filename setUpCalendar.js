const fs = require('fs');
const path = require('path');

const imageFolder = "your_images_here/"

console.log("Read images from folder " + imageFolder + "...");

const directoryPath = path.join(__dirname, imageFolder);
const targetPath = path.join(__dirname, "src/img/");

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + directoryPath + ", " + err);
    } 
    if (files.length === 0) return console.error("No images in " + directoryPath + "found.")
    if (files.length < 24) return console.error("Not enough images in " + directoryPath + "found. Must be exactly 24.");
    if (files.length > 24) return console.error("To many images in " + directoryPath + "found. Must be exactly 24.");

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
