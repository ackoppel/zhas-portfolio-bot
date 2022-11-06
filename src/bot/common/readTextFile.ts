import * as fs from 'fs';

export const readTextFile = async (
  pathToFile: string,
  callback?: (text: string) => any,
): Promise<any> => {
  return fs.readFile(pathToFile, { encoding: 'utf-8' }, async (err, data) => {
    if (err) {
      throw new Error(`Document parse error\n${err}`);
    }
    if (!!callback) {
      try {
        await callback(data);
      } catch (e) {
        console.log(`Document parsing callback error\n${e}`);
      }
    }
    return data;
  });
};
