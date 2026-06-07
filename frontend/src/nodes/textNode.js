import { useMemo } from 'react';
import { BaseNode } from './BaseNode';
import { extractTextVariables } from './textVariables';

export const TextNode = ({ id, data }) => {
  const text = data?.text ?? '{{input}}';
  const variables = useMemo(() => extractTextVariables(text), [text]);
  const lines = text.split('\n');
  const longestLine = Math.max(...lines.map((line) => line.length), 12);
  const width = Math.min(Math.max(longestLine * 7 + 56, 240), 520);
  const minHeight = Math.min(Math.max(lines.length * 24 + 150, 190), 440);

  const variableHandles = variables.map((variable, index) => ({
    type: 'target',
    position: 'left',
    id: `${id}-${variable}`,
    style: {
      top: `${((index + 1) / (variables.length + 1)) * 100}%`,
    },
  }));

  return (
    <BaseNode
      id={id}
      data={{ ...data, text }}
      title="Text"
      eyebrow="TEMPLATE"
      description="Use {{variableName}} to create dynamic inputs."
      className="text-node"
      style={{ width, minHeight }}
      fields={[
        {
          name: 'text',
          label: 'Text',
          type: 'textarea',
          rows: Math.max(lines.length, 4),
          defaultValue: '{{input}}',
          placeholder: 'Write text with {{variables}}',
        },
      ]}
      handles={[
        ...variableHandles,
        { type: 'source', position: 'right', id: `${id}-output` },
      ]}
    >
      {variables.length > 0 && (
        <div className="variable-list">
          {variables.map((variable) => (
            <span key={variable}>{variable}</span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
