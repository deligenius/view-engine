import { join } from "https://deno.land/std/path/posix.ts";

export async function getTemplate(viewRoot: string, fileName: string) {
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  let filePath = viewRoot + fileName;

  if (filePath.match(urlRegex)) {
    return await fetch(filePath).then((res) => res.text());
  } else {
    filePath = join(viewRoot, fileName);
    return Deno.readTextFileSync(filePath);
  }
}
