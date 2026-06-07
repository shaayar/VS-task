export const nodeDefinitions = {
  customInput: {
    type: 'customInput',
    label: 'Input',
    icon: 'IN',
    subtitle: 'External value',
    title: 'Input',
    eyebrow: 'SOURCE',
    description: 'Receives a value from outside the pipeline.',
    meta: '1 output',
    defaults: { inputName: 'input', inputType: 'Text' },
    fields: [
      { name: 'inputName', label: 'Name', defaultValue: 'input' },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { label: 'Text', value: 'Text' },
          { label: 'File', value: 'File' },
        ],
      },
    ],
    handles: [{ type: 'source', position: 'right', id: 'value' }],
  },
  llm: {
    type: 'llm',
    label: 'LLM',
    icon: 'AI',
    subtitle: 'Model call',
    title: 'LLM',
    eyebrow: 'MODEL',
    description: 'Combines system context and prompt content.',
    meta: '2 inputs / 1 output',
    handles: [
      { type: 'target', position: 'left', id: 'system', style: { top: '36%' } },
      { type: 'target', position: 'left', id: 'prompt', style: { top: '68%' } },
      { type: 'source', position: 'right', id: 'response' },
    ],
  },
  customOutput: {
    type: 'customOutput',
    label: 'Output',
    icon: 'OUT',
    subtitle: 'Pipeline result',
    title: 'Output',
    eyebrow: 'RESULT',
    description: 'Publishes a pipeline result.',
    meta: '1 input',
    defaults: { outputName: 'output', outputType: 'Text' },
    fields: [
      { name: 'outputName', label: 'Name', defaultValue: 'output' },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { label: 'Text', value: 'Text' },
          { label: 'Image', value: 'Image' },
        ],
      },
    ],
    handles: [{ type: 'target', position: 'left', id: 'value' }],
  },
  text: {
    type: 'text',
    label: 'Text',
    icon: 'TXT',
    subtitle: 'Template content',
    title: 'Text',
    eyebrow: 'TEMPLATE',
    defaults: { text: '{{input}}' },
  },
  api: {
    type: 'api',
    label: 'API',
    icon: 'API',
    subtitle: 'HTTP request',
    title: 'API Node',
    eyebrow: 'HTTP',
    description: 'Calls an external API endpoint.',
    meta: 'request / response',
    defaults: { method: 'GET', endpoint: '/v1/resource' },
    fields: [
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'GET',
        options: [
          { label: 'GET', value: 'GET' },
          { label: 'POST', value: 'POST' },
          { label: 'PUT', value: 'PUT' },
        ],
      },
      { name: 'endpoint', label: 'Endpoint', defaultValue: '/v1/resource' },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'request' },
      { type: 'source', position: 'right', id: 'response' },
    ],
  },
  database: {
    type: 'database',
    label: 'Database',
    icon: 'DB',
    subtitle: 'Structured data',
    title: 'Database Node',
    eyebrow: 'DATA',
    description: 'Reads or writes structured records.',
    meta: 'query / rows',
    defaults: { operation: 'Query', table: 'customers' },
    fields: [
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'Query',
        options: [
          { label: 'Query', value: 'Query' },
          { label: 'Insert', value: 'Insert' },
          { label: 'Update', value: 'Update' },
        ],
      },
      { name: 'table', label: 'Table', defaultValue: 'customers' },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'query' },
      { type: 'source', position: 'right', id: 'rows' },
    ],
  },
  prompt: {
    type: 'prompt',
    label: 'Prompt',
    icon: 'PR',
    subtitle: 'Reusable instruction',
    title: 'Prompt Node',
    eyebrow: 'TEXT',
    description: 'Defines reusable prompt instructions.',
    meta: 'context / prompt',
    defaults: { tone: 'Concise', prompt: 'Summarize the input.' },
    fields: [
      { name: 'tone', label: 'Tone', defaultValue: 'Concise' },
      {
        name: 'prompt',
        label: 'Prompt',
        type: 'textarea',
        rows: 3,
        defaultValue: 'Summarize the input.',
      },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'context' },
      { type: 'source', position: 'right', id: 'prompt' },
    ],
  },
  condition: {
    type: 'condition',
    label: 'Condition',
    icon: 'IF',
    subtitle: 'Branch logic',
    title: 'Condition Node',
    eyebrow: 'LOGIC',
    description: 'Routes data based on a simple expression.',
    meta: 'true / false',
    defaults: { expression: 'score > 0.8' },
    fields: [{ name: 'expression', label: 'When', defaultValue: 'score > 0.8' }],
    handles: [
      { type: 'target', position: 'left', id: 'input' },
      { type: 'source', position: 'right', id: 'true', style: { top: '42%' } },
      { type: 'source', position: 'right', id: 'false', style: { top: '72%' } },
    ],
  },
  webhook: {
    type: 'webhook',
    label: 'Webhook',
    icon: 'WH',
    subtitle: 'Event trigger',
    title: 'Webhook Node',
    eyebrow: 'EVENT',
    description: 'Starts or notifies a workflow via webhook.',
    meta: 'payload / delivery',
    defaults: { eventName: 'pipeline.completed', secret: 'enabled' },
    fields: [
      { name: 'eventName', label: 'Event', defaultValue: 'pipeline.completed' },
      {
        name: 'secret',
        label: 'Secret',
        type: 'select',
        defaultValue: 'enabled',
        options: [
          { label: 'Enabled', value: 'enabled' },
          { label: 'Disabled', value: 'disabled' },
        ],
      },
    ],
    handles: [
      { type: 'target', position: 'left', id: 'payload' },
      { type: 'source', position: 'right', id: 'delivery' },
    ],
  },
};

export const toolbarNodes = [
  nodeDefinitions.customInput,
  nodeDefinitions.llm,
  nodeDefinitions.customOutput,
  nodeDefinitions.text,
  nodeDefinitions.api,
  nodeDefinitions.database,
  nodeDefinitions.prompt,
  nodeDefinitions.condition,
  nodeDefinitions.webhook,
].filter(Boolean);

export const getNodeDefaults = (type, id) => {
  const definition = nodeDefinitions[type];
  const defaults = definition?.defaults || {};

  if (type === 'customInput') {
    return { ...defaults, inputName: id.replace('customInput-', 'input_') };
  }

  if (type === 'customOutput') {
    return { ...defaults, outputName: id.replace('customOutput-', 'output_') };
  }

  if (type === 'text') {
    return { text: '{{input}}' };
  }

  return defaults;
};
