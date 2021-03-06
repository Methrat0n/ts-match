import type { Union, List } from 'ts-toolbelt'

export type Match<
  T extends {__type: string}
> = <Return>(
  matcher: UnnamedMatch<T, Return> | MatchesWithUnderscore<T, Return> | NamedMatches<Union.ListOf<T>, Return>
) => (t: T) => Return

type NamedMatches<T extends ReadonlyArray<{__type: string}>, Return> = 
  T[1] extends undefined ? NamedMatch<T[0], Return> : NamedMatch<T[0], Return> & NamedMatches<List.Tail<T>, Return>

type MatchesWithUnderscore<All extends {__type: string}, Return> = UnnamedMatch<All, Return> & NamedMatch<All, Return>

type UnnamedMatch<Param, Return> = 
  { _: (match: Param) => Return }

type NamedMatch<Param extends {__type: string}, Return> =
  { [key in Param["__type"]]: (match: Param) => Return }
