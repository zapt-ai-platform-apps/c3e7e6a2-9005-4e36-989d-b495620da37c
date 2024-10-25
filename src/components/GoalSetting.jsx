import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';

function GoalSetting() {
  const [goal, setGoal] = createSignal('');
  const [actionSteps, setActionSteps] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `Break down this goal into actionable steps: "${goal()}". Provide the steps in JSON format as an array under the key "steps".`,
        response_type: 'json'
      });
      setActionSteps(result.steps || []);
    } catch (error) {
      console.error('Error generating action steps:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="p-8 h-full">
      <h2 class="text-2xl font-bold mb-4">Goal Setting</h2>
      <form onSubmit={handleGoalSubmit} class="space-y-4">
        <input
          type="text"
          class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:outline-none"
          placeholder="Enter your ambitious goal"
          value={goal()}
          onInput={(e) => setGoal(e.target.value)}
          required
        />
        <button
          type="submit"
          class={`px-6 py-3 bg-purple-500 text-white rounded-lg cursor-pointer hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading()}
        >
          {loading() ? 'Generating Steps...' : 'Generate Action Steps'}
        </button>
      </form>

      {actionSteps().length > 0 && (
        <div class="mt-8">
          <h3 class="text-xl font-bold mb-4">Action Steps</h3>
          <ul class="list-disc pl-5 space-y-2">
            <For each={actionSteps()}>
              {(step, index) => (
                <li>{step}</li>
              )}
            </For>
          </ul>
        </div>
      )}
    </div>
  );
}

export default GoalSetting;