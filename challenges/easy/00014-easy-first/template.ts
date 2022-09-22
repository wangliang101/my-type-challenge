/**
 * 1.判断输入必须为数组
 * 2.返回数组的第一项
 */
// 方法1
// type First<T extends any[]> = T extends [] ? never : T[0];

// 方法2
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0];

// 方法3
// type First<T extends any[]> = T[0] extends T[number] ? T[0] : never;

// 方法4
type First<T extends any[]> = T extends [infer First, ...infer Rest] ? First : never;

// type t1 = First<[1, 3]>;
