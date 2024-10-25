import { createSignal } from 'solid-js';
import { Link, Routes, Route, useNavigate } from '@solidjs/router';
import GoalSetting from './GoalSetting';
import StrategyBuilder from './StrategyBuilder';
import RiskCalculator from './RiskCalculator';
import PitchPerfect from './PitchPerfect';
import ConfidenceBooster from './ConfidenceBooster';
import ProgressTracker from './ProgressTracker';
import ResourceLibrary from './ResourceLibrary';
import PivotPlanner from './PivotPlanner';
import AccountabilityPartner from './AccountabilityPartner';
import { supabase } from '../supabaseClient';

function Dashboard(props) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div class="flex h-full">
      <aside class="w-64 bg-gray-800 text-white flex-shrink-0">
        <div class="p-4">
          <h1 class="text-2xl font-bold text-center">Big Play Launcher</h1>
        </div>
        <nav class="mt-4">
          <ul>
            <li><Link href="/dashboard/goal-setting" class="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Goal Setting</Link></li>
            <li><Link href="/dashboard/strategy-builder" class="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Strategy Builder</Link></li>
            <li><Link href="/dashboard/risk-calculator" class="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Risk Calculator</Link></li>
            <li><Link href="/dashboard/pitch-perfect" class="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Pitch Perfect</Link></li>
            <li><Link href="/dashboard/confidence-booster" class="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Confidence Booster</Link></li>
            <li><Link href="/dashboard/progress-tracker" class="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Progress Tracker</Link></li>
            <li><Link href="/dashboard/resource-library" class="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Resource Library</Link></li>
            <li><Link href="/dashboard/accountability-partner" class="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Accountability Partner</Link></li>
            <li><Link href="/dashboard/pivot-planner" class="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Pivot Planner</Link></li>
            <li><a href="https://the-100k-hustle-hub.mn.co/share/3Q0CNuDBOTbawtlA" target="_blank" rel="noopener noreferrer" class="block px-4 py-2 hover:bg-gray-700 cursor-pointer">Network Connector</a></li>
            <li><button onClick={handleSignOut} class="w-full text-left px-4 py-2 hover:bg-gray-700 cursor-pointer">Sign Out</button></li>
          </ul>
        </nav>
      </aside>
      <main class="flex-1 bg-gray-100 overflow-auto">
        <Routes>
          <Route path="/goal-setting" element={<GoalSetting />} />
          <Route path="/strategy-builder" element={<StrategyBuilder />} />
          <Route path="/risk-calculator" element={<RiskCalculator />} />
          <Route path="/pitch-perfect" element={<PitchPerfect />} />
          <Route path="/confidence-booster" element={<ConfidenceBooster />} />
          <Route path="/progress-tracker" element={<ProgressTracker />} />
          <Route path="/resource-library" element={<ResourceLibrary />} />
          <Route path="/pivot-planner" element={<PivotPlanner />} />
          <Route path="/accountability-partner" element={<AccountabilityPartner />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;