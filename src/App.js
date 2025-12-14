import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: '#f8fafc',
      }}
    >
      <PipelineToolbar />
      <div style={{ flex: 1, position: 'relative' }}>
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;

