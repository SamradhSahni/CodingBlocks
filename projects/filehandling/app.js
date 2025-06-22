const fs = require('fs');
const Jimp = require('jimp'); 


const str = fs.readFileSync('image.txt', { encoding: 'utf-8' });
const buffer = Buffer.from(str, 'base64');
console.log(buffer);


fs.writeFileSync('image.png', buffer);


Jimp.read('image.png')
    .then(image => {
        return image
            .resize(256, 256)  
            .quality(60)        
            .greyscale()       
            .writeAsync('image_resize.png'); 
    })
    .catch(err => {
        console.error('Error:', err);
    });
