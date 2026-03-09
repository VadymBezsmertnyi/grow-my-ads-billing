export const getPaginationMeta = (
  page: number,
  limit: number,
  total: number
) => ({
  page,
  limit,
  total,
  pages: Math.ceil(total / limit) || 1,
});
