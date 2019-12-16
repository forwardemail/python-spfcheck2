const path = require('path');
const { which, exec } = require('shelljs');
const semver = require('semver');

const filePath = path.join(__dirname, 'spfcheck2.py');

// ensure python installed
if (!which('python3')) throw new Error(`Python v3.5+ is required`);

const silent = process.env.NODE_ENV !== 'test';

// ensure python v3.5+
let version = exec('python3 --version', { silent });
version = semver.coerce(
  (version.stdout || version.stderr).split(' ')[1].trim()
);

if (!semver.satisfies(version, '>= 3.5'))
  throw new Error(
    `Python v3.5+ is required, you currently have v${version} installed`
  );

module.exports = function(ip, address, host) {
  return new Promise((resolve, reject) => {
    exec(
      `python3 ${filePath} ${ip} ${address} ${host}`,
      { silent },
      (code, stdout, stderr) => {
        if (code !== 0) return reject(new Error(stderr));
        resolve(stdout.trim().split(','));
      }
    );
  });
};
