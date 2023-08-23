const logOnDev = (message: string) => {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(message);
  }
};

export { logOnDev };
