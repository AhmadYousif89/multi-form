import {
  TopNavigation,
  SideNavigation,
  DisplayStep,
  BottomNavigation,
} from './components/layout';

function App() {
  return (
    <main className="main">
      <TopNavigation />
      <SideNavigation />
      <DisplayStep />
      <BottomNavigation />
    </main>
  );
}

export default App;
