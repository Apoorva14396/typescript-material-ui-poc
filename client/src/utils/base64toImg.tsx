export const base64ToImage = (data1: any) => {
  // console.log('data is', data);

  // let testing: any = new Uint8Array(data);
  // console.log('testing is', testing);

  // let STRING_CHAR = String.fromCharCode(testing);

  // let test = btoa(STRING_CHAR);
  // console.log('test is', test);
  let test = btoa(
    new Uint8Array(data1).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, '')
  );

  return test;
};
