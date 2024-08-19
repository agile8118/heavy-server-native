// Controllers
const User = require("./controllers/user");
const { performance } = require("perf_hooks");
const { generatePrimes } = require("bindings")("heavy-lifter");
// const generatePrimesJS = require("../lib/prime-generator");

module.exports = (server) => {
  /** Test route */
  server.route("get", "/api/get-json-data", (req, res) => {
    // send a big size json data
    res.json({ data: "This is a big size json data. ".repeat(100) });
  });

  // ------------------------------------------------ //
  // ************ USER ROUTES ************* //
  // ------------------------------------------------ //

  // Log a user in and give them a token
  server.route("post", "/api/login", User.logUserIn);

  // Log a user out
  server.route("delete", "/api/logout", User.logUserOut);

  // Send user info
  server.route("get", "/api/user", User.sendUserInfo);

  // Update a user info
  server.route("put", "/api/user", User.updateUser);

  // ------------------------------------------------ //
  // ************ PRIME NUMBER ROUTES ************* //
  // ------------------------------------------------ //

  server.route("get", "/api/primes", (req, res) => {
    const count = Number(req.params.get("count"));
    let startingNumber = req.params.get("start");
    const start = performance.now();

    // ---- Generating the Primes with C++ ---- //
    generatePrimes(
      count,
      startingNumber,
      {
        format: true,
        log: false,
      },
      (err, primes) => {
        if (err) return console.error(err);

        res.json({
          primes,
          time: ((performance.now() - start) / 1000).toFixed(2),
        });
      }
    );

    // ---- Generating the Primes with JavaScript ---- //
    // startingNumber = BigInt(startingNumber);
    // if (startingNumber < BigInt(Number.MAX_SAFE_INTEGER)) {
    //   startingNumber = Number(startingNumber);
    // }

    // const primes = generatePrimesJS(count, startingNumber, {
    //   format: true,
    //   log: false,
    // });

    // res.json({
    //   primes,
    //   time: ((performance.now() - start) / 1000).toFixed(2),
    // });
  });
};
