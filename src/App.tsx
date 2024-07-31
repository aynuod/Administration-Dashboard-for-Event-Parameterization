import './App.css';
import { ThemeProvider } from "@/components/theme-provider";
import AppRoutes from './AppRoutes';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
