import childProcess = require('child_process');

export const executeCommand = (command: string): Promise<string> =>
  new Promise((resolve, reject) => {
    childProcess.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        console.log(error);
      } else if (stderr) {
        console.log(stderr);
        reject(stderr);
      }
      resolve(stdout);
    });
  });
