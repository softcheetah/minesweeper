import { width, height, mines } from "./config";

export const getSurroundings = (index) => {
  const surroundings = [];
  const x = index % width;
  const y = Math.floor(index / width);

  // Left
  if (x > 0) {
    surroundings.push(index - 1);
  }

  // Right
  if (x < width - 1) {
    surroundings.push(index + 1);
  }

  // Top
  if (y > 0) {
    const top = index - width;
    surroundings.push(top);
    // Top Left
    if (x > 0) surroundings.push(top - 1);
    // Top Right
    if (x < width - 1) surroundings.push(top + 1);
  }

  // Bottom
  if (y < height - 1) {
    const bottom = index + width;
    surroundings.push(bottom);
    // Bottom Left
    if (x > 0) surroundings.push(bottom - 1);
    // Bottom Right
    if (x < width - 1) surroundings.push(bottom + 1);
  }

  // Return
  return surroundings;
};

export const generateFields = () => {
  const length = width * height;
  const fields = new Array(length);
  fields.fill(0);

  // Set mines
  for (let count = 1; count <= mines; count += 1) {
    while (true) {
      const index = Math.floor(Math.random() * length);
      if (fields[index] === 0) {
        fields[index] = -1;
        break;
      }
    }
  }

  // Set numbers
  for (let index = 0; index < length; index += 1) {
    if (fields[index] === 0) {
      fields[index] = getSurroundings(index)
        .filter(sIndex => fields[sIndex] === -1).length;
    }
  }
  return fields;
};