// toolbar.js

import { DraggableNode } from './draggableNode';
import { toolbarNodes } from './nodes/nodeConfigs';

export const PipelineToolbar = () => {

    return (
        <aside className="pipeline-toolbar">
            <div className="toolbar-heading">
                <span>VectorShift</span>
                <strong>Pipeline Builder</strong>
            </div>
            <div className="toolbar-node-grid">
                {toolbarNodes.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                ))}
            </div>
        </aside>
    );
};
