import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

// 기본 Hooks
import UseStateDemo from './pages/HooksDemo/UseStateDemo';
import UseEffectDemo from './pages/HooksDemo/UseEffectDemo';
import UseContextDemo from './pages/HooksDemo/UseContextDemo';
import UseReducerDemo from './pages/HooksDemo/UseReducerDemo';
import UseRefDemo from './pages/HooksDemo/UseRefDemo';

// React 18/19 최신 Hooks
import UseTransitionDemo from './pages/HooksDemo/UseTransitionDemo';
import UseDeferredValueDemo from './pages/HooksDemo/UseDeferredValueDemo';
import UseIdDemo from './pages/HooksDemo/UseIdDemo';
import UseOptimisticDemo from './pages/HooksDemo/UseOptimisticDemo';

// Form Actions (React 19)
import FormActionsDemo from './pages/FormsDemo/FormActionsDemo';
import UseFormStatusDemo from './pages/FormsDemo/UseFormStatusDemo';
import FormStatusWithoutServerActionDemo from './pages/FormsDemo/FormStatusWithoutServerActionDemo';

// Suspense
import SuspenseBasicDemo from './pages/SuspenseDemo/SuspenseBasicDemo';

// Powerful Features (React 19/18 강력한 기능들)
import PowerfulFeaturesOverview from './pages/PowerfulFeatures/PowerfulFeaturesOverview';
import UseTransitionDemoFeature from './pages/PowerfulFeatures/UseTransitionDemo';
import UseOptimisticDemoFeature from './pages/PowerfulFeatures/UseOptimisticDemo';
import ServerActionsDemo from './pages/PowerfulFeatures/ServerActionsDemo';
import UseDeferredValueDemoFeature from './pages/PowerfulFeatures/UseDeferredValueDemo';
import SuspenseDemoFeature from './pages/PowerfulFeatures/SuspenseDemo';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* 기본 Hooks */}
        <Route path="/hooks/use-state" element={<UseStateDemo />} />
        <Route path="/hooks/use-effect" element={<UseEffectDemo />} />
        <Route path="/hooks/use-context" element={<UseContextDemo />} />
        <Route path="/hooks/use-reducer" element={<UseReducerDemo />} />
        <Route path="/hooks/use-ref" element={<UseRefDemo />} />

        {/* React 18/19 최신 Hooks */}
        <Route path="/hooks/use-transition" element={<UseTransitionDemo />} />
        <Route path="/hooks/use-deferred-value" element={<UseDeferredValueDemo />} />
        <Route path="/hooks/use-id" element={<UseIdDemo />} />
        <Route path="/hooks/use-optimistic" element={<UseOptimisticDemo />} />

        {/* Form Actions */}
        <Route path="/forms/actions" element={<FormActionsDemo />} />
        <Route path="/forms/use-form-status" element={<UseFormStatusDemo />} />

        {/* Suspense */}
        <Route path="/suspense/basic" element={<SuspenseBasicDemo />} />

        {/* Powerful Features (React 19/18 강력한 기능들) */}
        <Route path="/powerful-features" element={<PowerfulFeaturesOverview />} />
        <Route
          path="/powerful-features/use-transition"
          element={<UseTransitionDemoFeature />}
        />
        <Route
          path="/powerful-features/use-optimistic"
          element={<UseOptimisticDemoFeature />}
        />
        <Route
          path="/powerful-features/server-actions"
          element={<ServerActionsDemo />}
        />
        <Route
          path="/powerful-features/use-deferred-value"
          element={<UseDeferredValueDemoFeature />}
        />
        <Route
          path="/powerful-features/suspense-streaming"
          element={<SuspenseDemoFeature />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
