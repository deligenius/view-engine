import { path } from "../../deps.ts";

const urlRegex =
/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;


export async function getTemplate(viewRoot: string, fileName: string) {
  let filePath = viewRoot + fileName;

  if (filePath.match(urlRegex)) {
    return await fetch(filePath).then((res) => res.text());
  } else {
    filePath = path.join(viewRoot, fileName);
    return Deno.readTextFileSync(filePath);
  }
}
