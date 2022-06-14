import { path } from "../../../deps.ts";

const urlRegex =
/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;


export function getTemplate(viewRoot: string, fileName: string): Promise<string> {
  const filePath = path.join(viewRoot, fileName);
  return Deno.readTextFile(filePath);
}
