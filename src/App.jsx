import TradeFlowAnalyzer from './components/TradeFlowAnalyzer';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <TradeFlowAnalyzer />
    </AuthProvider>
  );
}

export default App;
