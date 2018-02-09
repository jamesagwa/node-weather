
// const myPromise = new Promise((resolve, reject) => {
//     // resolve gets returned in the then block as the success data
//     resolve('it Worked');
//     reject('So sorry it didn\'t work');
// });

// myPromise.then((success) => console.log(success), (error) => console.log(error));


const myPromise = (a, b) => {
    return new Promise((resolve, reject) => {
        if (typeof a === 'number' && typeof b === 'number') {
            resolve(a + b);
        } else {
            reject('Sorry only numbers are allowed');
        }
    })
};

myPromise(4, 5).then((result) => console.log(result)).catch((error) => console.log('error', error));