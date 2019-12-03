const path = require('path');
const { which, exec } = require('shelljs');
const semver = require('semver');

const filePath = path.join(__dirname, 'spfcheck2.py');

// ensure python installed
if (!which('python')) throw new Error(`Python v2.6+ is required`);

const silent = { silent: true };

// ensure python v2.6+
let version = exec('python --version', silent);
version = semver.coerce(
  (version.stdout || version.stderr).split(' ')[1].trim()
);

if (!semver.satisfies(version, '>= 2.6'))
  throw new Error(
    `Python v2.6+ is required, you currently have v${version} installed`
  );

module.exports = function(ip, address, host) {
  return new Promise((resolve, reject) => {
    exec(
      `python ${filePath} ${ip} ${address} ${host}`,
      silent,
      (code, stdout, stderr) => {
        if (typeof stdout === 'string') {
          if (stdout.includes('ImportError: No module named spf'))
            stderr = 'Please install "pyspf" locally using `pip install pyspf`';
          else if (stdout.includes('ipaddr module required'))
            stderr =
              'Please install "ipaddr" locally using `pip install ipaddr`';
          else if (stdout.includes('ImportError: No module named DNS'))
            stderr = `Please install "dns" locally using \`pip install ${
              semver.satisfies(version, '>= 3') ? 'py3dns' : 'pydns==2.3.4'
            }\``;
        }

        if (code !== 0) return reject(new Error(stderr));
        resolve(stdout.trim().split(','));
      }
    );
  });
};
