import { BaseNode } from './BaseNode';
import { nodeDefinitions } from './nodeConfigs';

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      {...nodeDefinitions.customOutput}
      handles={nodeDefinitions.customOutput.handles.map((handle) => ({
        ...handle,
        id: `${id}-${handle.id}`,
      }))}
    />
  );
};
