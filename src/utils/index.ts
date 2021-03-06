const getRandomElements = <T>(arr: T[], n: number): T[] => {
  arr.sort(() => Math.random() - Math.random());
  return arr.slice(0, n);
};

const getRandomNumber = (min = 0, max = 100) => Math.floor(
  Math.random() * (max - min + 1),
) + min;

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export {
  getRandomElements,
  getRandomNumber,
  sleep,
};
