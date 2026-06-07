// draggableNode.js

export const DraggableNode = ({ type, label, icon, subtitle }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="draggable-node"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
          >
          <span className="draggable-node-mark">{icon || label.slice(0, 2).toUpperCase()}</span>
          <span className="draggable-node-copy">
            <strong>{label}</strong>
            {subtitle && <small>{subtitle}</small>}
          </span>
      </div>
    );
  };
  
