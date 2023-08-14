// eslint-disable-next-line @typescript-eslint/no-explicit-any
const utilThrottle = <F extends (...args: any[]) => any>(callback: F, delay: number) => {
  let timerId: NodeJS.Timeout | null;
  return (...args: Parameters<F>) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback(...args);
      timerId = null;
    }, delay);
  };
};

export default utilThrottle;
