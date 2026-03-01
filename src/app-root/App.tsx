import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProviders } from '@/app/providers/app-providers';

function App() {
  return (
    <SafeAreaProvider>
      <AppProviders />
    </SafeAreaProvider>
  );
}

export default App;
