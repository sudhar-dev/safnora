const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function run() {
  const pythonScript = path.join(__dirname, "convert-logo.py");
  try {
    console.log("Running python logo converter script...");
    execSync(`python3 "${pythonScript}"`, { stdio: "inherit" });
  } catch (err) {
    console.error("Python script failed, checking fallback...", err.message);
  }
}

run();
