export async function getTemplate(filePath: string) {
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  if (filePath.match(urlRegex)) {
    return await fetch(filePath).then((res) => res.text());
  } else {
    return Deno.readTextFileSync(filePath);
  }
}