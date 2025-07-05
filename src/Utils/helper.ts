export type QueryParams = Record<
  string,
  string | number | boolean | (string | number | boolean)[]
>;

export const createQueryString = (params: QueryParams): string => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Join arrays with comma: tag=one,two
      query.append(key, value.join(","));
    } else if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  return query.toString() ? `?${query.toString()}` : "";
};
