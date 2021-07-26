// THE CALLBACK VERSION
const fakeRequestCallback = (url, success, failure) => {
  const delay = Math.floor(Math.random() * 1000);
  setTimeout(() => {
    if (delay > 500) {
      failure("Callback: Connection Timeout :(");
    } else {
      success(`Callback: Here is your fake data from ${url}`);
    }
  }, delay);
};

// THE PROMISE VERSION
const fakeRequestPromise = async (url) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 1000);
    setTimeout(() => {
      if (delay > 100) {
        reject("Promise: Connection Timeout :(");
      } else {
        resolve(`Promise: Here is your fake data from ${url}`);
      }
    }, delay);
  })
    .then((value) => {
      console.log(value);
    })
    .catch((error) => {
      console.log(error);
      fakeRequestPromise(promiseUrl);
    });
};

const callbackUrl = "https://www.callback.com";
const success = (message) => {
  console.log(message);
};
const failureCallback = (message) => {
  console.log(message);
  fakeRequestCallback(callbackUrl, success, failureCallback);
};
fakeRequestCallback(callbackUrl, success, failureCallback);

const promiseUrl = "https://www.promise.com";
fakeRequestPromise(promiseUrl);
