export const rightHandle = (id, top = '50%') => ({
  id,
  top,
})

export const leftHandle = (id, top = '50%') => ({
  id,
  top,
})

export const extractVariables = (text) => {
  if (!text) return []

  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g
  const variables = new Set()
  let match;

  while ((match = regex.exec(text)) !== null) {
    variables.add(match[1])
  }

  return Array.from(variables)
}

export const getActiveVariable = (text, cursorPos) => {
  const beforeCursor = text.slice(0, cursorPos);

  let match = beforeCursor.match(/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)?$/);
  if (match) {
    return match[1] ?? '';
  }

  match = beforeCursor.match(/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}$/);
  if (match) {
    return match[1];
  }

  return null;
};

export const replaceActiveVariable = (text, cursorPos, variable) => {
  const beforeCursor = text.slice(0, cursorPos);
  const afterCursor = text.slice(cursorPos);

  const startIndex = beforeCursor.lastIndexOf('{{');

  if (startIndex === -1) return text;

  const closingIndex = afterCursor.indexOf('}}');

  const before = text.slice(0, startIndex);
  const after =
    closingIndex !== -1
      ? afterCursor.slice(closingIndex + 2)
      : afterCursor;

  return `${before}{{${variable}}}${after}`;
};

