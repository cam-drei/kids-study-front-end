export const slugify = string =>
  string
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    // eslint-disable-next-line
    .replace(/\-\-+/g, '-')     // Replace multiple - with single -
    .replace(/\s+/g, '-')       // Replace spaces with -
