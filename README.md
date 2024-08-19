# Prime Generator Web App

This an HTTP web application that uses a native addon in Node.js written in C++ for the prime generations.This repo is related to the [node-cpu-intensive](https://github.com/agile8118/node-cpu-intensive) project featured in the Multi-Threading section of the [Understanding Node.js: Core Concepts](https://www.udemy.com/course/understanding-nodejs-core-concepts/?referralCode=0BC21AC4DD6958AE6A95) course.

## How to Run the App

1. Build GMP: `./gmp.sh`
2. Install dependencies: `npm install`
3. Configure node-gyp: `npm run config`
4. Build C++: `npm run build`
5. Run the server: `npm start`

Look into data/users for login info of a sample user.

## Notes

Ensure your machine is set up for C++ development. While the `gmp.sh` script handles GMP, you also need tools like CMake and Make installed. On Linux, you can install these tools with:

```
sudo apt install m4 cmake autoconf automake libtool
```

### Unable to Build & Link GMP?

On Linux, the `./gmp.sh` script might not properly set up the library with node-gyp. If that happens, install GMP manually:

```
sudo apt install libgmp-dev
```

Alternatively, you can check out the [node-cpu-intensive-no-gmp](https://github.com/agile8118/node-cpu-intensive-no-gmp) repository, which is the project but without the GMP library. However, note that you won’t be able to use arbitrarily large numbers (larger than `unsigned long long`) for C++ tests. You also need to set up the server yourself there, but you'll be able to copy the src folder of this repo.
