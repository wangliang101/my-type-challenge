type MyExclude<T, U> = T extends U ? never : T;

// type a1 = '1' | '2' | '3';
// type a2 = '3';
// type a = MyExclude<a1, a2>;
