import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { SolidMarkdown } from 'solid-markdown';

function PivotPlanner() {
  const [challenge, setChallenge] = createSignal('');
  const [alternativePlan, setAlternativePlan] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleGeneratePivot = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `Suggest alternative strategies for the following challenge: "${challenge()}". Provide the suggestions in markdown format.`,
        response_type: 'text'
      });
      setAlternativePlan(result);
    } catch (error) {
      console.error('Error generating pivot plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="p-8 h-full">
      <h2 class="text-2xl font-bold mb-4 text-orange-600">Pivot Planner</h2>
      <form onSubmit={handleGeneratePivot} class="space-y-4">
        <textarea
          class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-orange-400 focus:outline-none"
          placeholder="Describe the challenges you're facing"
          value={challenge()}
          onInput={(e) => setChallenge(e.target.value)}
          rows="5"
          required
        ></textarea>
        <button
          type="submit"
          class={`px-6 py-3 bg-orange-500 text-white rounded-lg cursor-pointer hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading()}
        >
          {loading() ? 'Generating Alternatives...' : 'Generate Alternatives'}
        </button>
      </form>

      <Show when={alternativePlan()}>
        <div class="mt-8">
          <h3 class="text-xl font-bold mb-4 text-orange-600">Alternative Strategies</h3>
          <div class="prose max-w-none">
            <SolidMarkdown children={alternativePlan()} />
          </div>
        </div>
      </Show>
    </div>
  );
}

export default PivotPlanner;