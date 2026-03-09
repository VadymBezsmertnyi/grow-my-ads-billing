type SearchParamsT = Record<string, string | string[] | undefined>;

export const flattenSearchParams = (params: SearchParamsT | null | undefined) =>
  Object.fromEntries(
    Object.entries(params ?? {}).map(([k, v]) => [
      k,
      Array.isArray(v) ? v[0] : v,
    ])
  );
