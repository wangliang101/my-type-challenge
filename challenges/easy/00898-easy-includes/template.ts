// type Includes<T extends readonly any[], U> = any

type IsEqual<A, B> = (<X>() => X extends A ? 1 : 2) extends <X>() => X extends B ? 1 : 2 ? true : false;
type Includes<T extends readonly any[], U> = T extends [infer First, ...infer Rust]
  ? true extends IsEqual<First, U>
    ? true
    : Includes<Rust, U>
  : false;
