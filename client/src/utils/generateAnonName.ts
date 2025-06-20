const adjectives = [
  "Curious",
  "Brave",
  "Witty",
  "Silent",
  "Swift",
  "Lazy",
  "Loyal",
  "Crazy",
];
const animals = [
  "Fox",
  "Panda",
  "Otter",
  "Hawk",
  "Tiger",
  "Duck",
  "Koala",
  "Giraffe",
];

export const generateAnonName = (): string => {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${adj}${animal}${number}`;
};
