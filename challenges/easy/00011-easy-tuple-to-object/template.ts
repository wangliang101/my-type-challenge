type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [P in T[number]]: P;
};

// type r = TupleToObject<typeof tuple>;

/**
 * 1、返回一个对象
 * 2、遍历这个数据，形成key:value结构
 */
// function tupleToObject(tuple){
//   const obj = {}

//   tuple.forEach(v => {
//     obj[v] = v
//   });

//   return obj
// }
