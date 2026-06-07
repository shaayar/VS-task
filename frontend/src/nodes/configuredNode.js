import { BaseNode } from './BaseNode';
import { nodeDefinitions } from './nodeConfigs';

export const createConfiguredNode = (type) => {
  const definition = nodeDefinitions[type];

  return function ConfiguredNode({ id, data }) {
    return (
      <BaseNode
        id={id}
        data={data}
        {...definition}
        handles={definition.handles.map((handle) => ({
          ...handle,
          id: `${id}-${handle.id}`,
        }))}
      />
    );
  };
};
