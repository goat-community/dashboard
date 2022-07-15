export function baseUrl(): string {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev code
    return "http://localhost:4000/api";
  } else {
    // production code
    return "https://goat-dev.plan4better.de/api/v1/";
  }
}
