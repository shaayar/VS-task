const VARIABLE_PATTERN = /{{\s*([A-Za-z_$][\w$]*)\s*}}/g;

export const extractTextVariables = (text = '') => {
  const variables = [];
  const seen = new Set();
  let match;

  while ((match = VARIABLE_PATTERN.exec(text)) !== null) {
    const variableName = match[1];

    if (!seen.has(variableName)) {
      seen.add(variableName);
      variables.push(variableName);
    }
  }

  return variables;
};
