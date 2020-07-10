import React from 'react';
import ReactJson from 'react-json-view';

interface Formatter {
  title?: string;
  source: Record<string, unknown>;
}

const Formatter: React.FunctionComponent<Formatter> = (props: Formatter) => {
  const { title, source } = props;

  if (!Object.keys(source).length) {
    return null;
  }

  return (
    <div style={{ marginBottom: 42 }}>
      {title && <p>{title}</p>}
      <div
        style={{
          background: '#fff',
          color: 'grey',
          padding: '12px',
          borderRadius: '4px',
        }}
      >
        <ReactJson src={source} />
      </div>
    </div>
  );
};

export type { Formatter };
export default Formatter;
