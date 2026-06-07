import { BaseNode } from './BaseNode';
import { nodeDefinitions } from './nodeConfigs';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      {...nodeDefinitions.llm}
      handles={nodeDefinitions.llm.handles.map((handle) => ({
        ...handle,
        id: `${id}-${handle.id}`,
      }))}
    />
  );
};
