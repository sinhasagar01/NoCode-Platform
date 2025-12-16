import { PipelineToolbar } from './components/PipelineToolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './components/SubmitButton';

function App() {
  return (
    <div
      className="sidebar-bg"
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        background: "#ffffff",
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(234 234 234) 1px, transparent 0)`,
        backgroundSize: "20px 20px",
      }}
    >
      <PipelineToolbar />
      <div style={{ flex: 1, position: 'relative', background: '#ffffff' }}>
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;


<div className="min-h-screen w-full bg-white relative">
 {/* White Sphere Grid Background */}
 <div
   className="absolute inset-0 z-0"
   style={{
     background: "white",
     backgroundImage: `
       linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
       linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
       radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
     `,
     backgroundSize: "32px 32px, 32px 32px, 100% 100%",
   }}
 />
    {/* Your Content/Components */}
</div>