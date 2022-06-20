import { path } from "../../../deps.ts";

const urlRegex =
/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;


export async function getTemplate(viewRoot: string, fileName: string) {
  const filePath = path.join(viewRoot, fileName);
  const content = await Deno.readTextFile(filePath);
  return content
}
