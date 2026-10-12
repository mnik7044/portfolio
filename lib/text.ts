// Plain-text version of content strings (strips **strong** / `code` markers)
// for metadata, the curl card and llms.txt.
export function plain(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1');
}
