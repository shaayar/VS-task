import { BaseNode } from './BaseNode';
import { nodeDefinitions } from './nodeConfigs';

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      {...nodeDefinitions.customInput}
      handles={nodeDefinitions.customInput.handles.map((handle) => ({
        ...handle,
        id: `${id}-${handle.id}`,
      }))}
    />
  );
};
