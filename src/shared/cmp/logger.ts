export const isDev = import.meta.env.DEV;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const envLog = (...data: any) => {
  if (isDev) {
    console.log(...data);
  }
};
