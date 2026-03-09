export const formatDate = (d: string | Date) =>
  (typeof d === "string" ? new Date(d) : d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatMonth = (d: string | Date) =>
  (typeof d === "string" ? new Date(d) : d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
