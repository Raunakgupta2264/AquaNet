import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { StringAlgorithms } from './pages/StringAlgorithms';
import { SuffixStructures } from './pages/SuffixStructures';
import { DynamicProgramming } from './pages/DynamicProgramming';
import { NetworkFlow } from './pages/NetworkFlow';
import { NPCompleteness } from './pages/NPCompleteness';
import { RandomizedParallel } from './pages/RandomizedParallel';
import { AlgorithmExplorer } from './pages/AlgorithmExplorer';
import { ProjectArchitecture } from './pages/ProjectArchitecture';
import { ProjectMapping } from './pages/ProjectMapping';
import { FacultyDemo } from './pages/FacultyDemo';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/strings" element={<StringAlgorithms />} />
          <Route path="/suffix" element={<SuffixStructures />} />
          <Route path="/dp" element={<DynamicProgramming />} />
          <Route path="/network" element={<NetworkFlow />} />
          <Route path="/np" element={<NPCompleteness />} />
          <Route path="/random" element={<RandomizedParallel />} />
          <Route path="/explorer" element={<AlgorithmExplorer />} />
          <Route path="/architecture" element={<ProjectArchitecture />} />
          <Route path="/mapping" element={<ProjectMapping />} />
          <Route path="/demo" element={<FacultyDemo />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
