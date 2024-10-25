import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { SolidMarkdown } from 'solid-markdown';

function RiskCalculator() {
  const [details, setDetails] = createSignal('');
  const [riskReport, setRiskReport] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleRiskAssessment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `Assess the potential risks and rewards of the following plan: "${details()}". Provide the assessment in markdown format.`,
        response_type: 'text'
      });
      setRiskReport(result);
    } catch (error) {
      console.error('Error generating risk assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="p-8 h-full">
      <h2 class="text-2xl font-bold mb-4 text-red-600">Risk Calculator</h2>
      <form onSubmit={handleRiskAssessment} class="space-y-4">
        <textarea
          class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-red-400 focus:outline-none"
          placeholder="Enter details about your big move"
          value={details()}
          onInput={(e) => setDetails(e.target.value)}
          rows="5"
          required
        ></textarea>
        <button
          type="submit"
          class={`px-6 py-3 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading()}
        >
          {loading() ? 'Assessing Risks...' : 'Assess Risks'}
        </button>
      </form>

      <Show when={riskReport()}>
        <div class="mt-8">
          <h3 class="text-xl font-bold mb-4 text-red-600">Risk Assessment Report</h3>
          <div class="prose max-w-none">
            <SolidMarkdown children={riskReport()} />
          </div>
        </div>
      </Show>
    </div>
  );
}

export default RiskCalculator;