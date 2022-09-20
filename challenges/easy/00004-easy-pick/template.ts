type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * 返回一个对象
 * 遍历keys
 * 如果key在todo里
 * 则将值赋给新的对象
 */

// function myPick (todo, keys){
//   const obj = {}

//   keys.forEach(key => {
//     if(key in todo){
//       obj[key] = todo[key]
//     }
//   });

//   return obj
// }
