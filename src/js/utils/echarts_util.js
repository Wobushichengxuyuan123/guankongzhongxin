export function mergeOption(inOption, baseOption) {
  function fn1(inOption, baseOption) {
    let baseArr1 = Object.keys(baseOption);
    let inArr1 = Object.keys(inOption);
    inArr1.some((v1) => {
      baseArr1.some((v2) => {
        if (baseOption[v1]) {
          if (!/array|object/gi.test(typeof baseOption[v1])) {
            baseOption[v1] = inOption[v1];
          } else {
            if (Array.isArray(inOption[v1])) {
              baseOption[v1] = inOption[v1];
            } else {
              baseOption[v1] = fn1(inOption[v1], baseOption[v1]);
            }
          }
        } else {
          baseOption[v1] = inOption[v1];
        }
        return true;
      });
    });
    return baseOption;
  }
  fn1(inOption, baseOption);
  return baseOption;
}
let echartsUtils = {
  mergeOption
}
export default echartsUtils
