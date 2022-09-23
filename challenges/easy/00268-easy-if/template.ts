// https://www.typescriptlang.org/docs/handbook/type-compatibility.html#handbook-content
type If<C extends boolean, T, F> = C extends true ? T : F;

// 类型兼容性
// type b = null extends true ? '1' : '2';
