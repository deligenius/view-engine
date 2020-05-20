import {join} from 'https://deno.land/std/path/posix.ts'

export async function getTemplate(filePath: string) {
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  // if render React
  if (filePath.match(/(tsx|jsx)$/)) {
    // remote url
    if (filePath.match(urlRegex)) {
      const res = (await import(filePath)).default
      return res
    } else {
      const realFilePath = join("../../", filePath)
      const res = (await import(realFilePath)).default
      return res
    }
  }
  // if render url
  else if (filePath.match(urlRegex)) {
    return await fetch(filePath).then((res) => res.text());
  }
  // if render 
  else {
    return Deno.readTextFileSync(filePath);
  }
}

