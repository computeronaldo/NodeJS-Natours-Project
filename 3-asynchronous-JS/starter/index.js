const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if(err) reject('I could not find the image');
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if(err) reject('Could not write to the file.');
            resolve('success');
        });
    });
};

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(data);
    
        // const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images`);
        // console.log(res.body.message[0]);

        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images`);

        const res = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = res.map(el => el.body.message[0]);
        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Successfully written to file!');
    } catch(err) {
        console.log(err.message);
        throw (err);
    }
    return '2: Ready 🐶🐶';
};

(async () => {
    try {
        console.log('1: Will get dog pictures');
        const res = await getDogPic();
        console.log(res);
        console.log('3: Done getting dog pics!');    
    } catch(err) {
        console.log(err.message);
    }
})();

// console.log('1: Will get dog pictures');
// getDogPic().then(x => {
//     console.log(x);
//     console.log('3: Done getting dog pics!');
// }).catch(err => {
//     console.log(err.message);
// });

// readFilePro(`${__dirname}/dog.txt`).then(res => {
//     console.log(res);
    
//     return superagent.get(`https://dog.ceo/api/breed/${res}/images`)
// }).then(res => {
//     console.log(res.body.message[0]);
//     return writeFilePro('dog-img.txt', res.body.message[0]);
// }).then(() => {
//     console.log('Random dog image saved to file.')
// }).catch(err => {
//     console.log(err.message);
// });



// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//     console.log(`Breed: ${data}`);

//     superagent.get(`https://dog.ceo/api/breed/${data}/images`)
//     .then(res => {
//         console.log(res.body.message[0]);

//         fs.writeFile('dog-img.txt', res.body.message[0], err => {
//             if(err) return console.log(err);
//             console.log('Random dog image saved to file.');
//         });
//     }).catch(err => {
//         console.log(err.message);
//     })
// });