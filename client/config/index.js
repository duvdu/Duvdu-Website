const dev = process.env.NODE_ENV !== "projection";

export const server = dev ? "http://localhost:3001" : "";
