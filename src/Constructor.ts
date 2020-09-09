import type { Union, List } from 'ts-toolbelt'

type __Members<T, K extends List.Readonly<Array<unknown>>> = 
  ((...args: K) => unknown) extends ((head: infer H, ...tail: infer Tail) => unknown)
  ? H extends keyof T
    ? [T[H], __Members<T, Tail>]
    : []
  : []

type Members<T> = List.Flatten<__Members<T, Union.ListOf<keyof T>>>

//Extends infer actualy affect the variable, forcing the type to be compute before using it. It help avoid
//the `Type instantiation is excessively deep and possibly infinite` error
export type Constructor<T> = Members<Omit<T, "__type">> extends infer Args ? Args extends Array<unknown> ? (...args: Args) => T : never : never