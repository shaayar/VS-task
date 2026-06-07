import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const renderField = ({ field, value, onChange }) => {
  if (field.type === 'select') {
    return (
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        value={value}
        rows={field.rows || 3}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  return (
    <input
      type={field.type || 'text'}
      value={value}
      placeholder={field.placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export const BaseNode = ({
  id,
  data = {},
  title,
  eyebrow,
  description,
  fields = [],
  handles = [],
  children,
  className = '',
  style,
}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <div className={`base-node ${className}`} style={style}>
      {handles.map((handle) => (
        <Handle
          key={`${handle.type}-${handle.id}`}
          type={handle.type}
          position={positionMap[handle.position]}
          id={handle.id}
          className="node-handle"
          style={handle.style}
        />
      ))}

      <div className="node-header">
        {eyebrow && <span className="node-eyebrow">{eyebrow}</span>}
        <span className="node-title">{title}</span>
      </div>

      {description && <p className="node-description">{description}</p>}

      {fields.length > 0 && (
        <div className="node-fields">
          {fields.map((field) => {
            const value = data[field.name] ?? field.defaultValue ?? '';

            return (
              <label className="node-field" key={field.name}>
                <span>{field.label}</span>
                {renderField({
                  field,
                  value,
                  onChange: (fieldValue) => updateNodeField(id, field.name, fieldValue),
                })}
              </label>
            );
          })}
        </div>
      )}

      {children && <div className="node-body">{children}</div>}
    </div>
  );
};
