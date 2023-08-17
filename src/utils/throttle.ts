/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 콜백과 delay를 받아 콜백에 스로틀링을 부여합니다.
 * @param {F} callback - 지연 실행할 콜백 함수입니다.
 * @param {number} delay - 실행 간격을 밀리초 단위로 지정합니다.
 * @returns {(...args: Parameters<F>) => void} - 콜백 함수를 감싼 스로틀링 함수입니다.
 */
const throttle = <F extends (...args: any[]) => any>(callback: F, delay: number) => {
  let timerId: NodeJS.Timeout | undefined;
  return (...args: Parameters<F>) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback(...args);
      timerId = undefined;
    }, delay);
  };
};

export default throttle;
