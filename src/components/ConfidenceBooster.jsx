import { createSignal, onMount, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { SolidMarkdown } from 'solid-markdown';

function ConfidenceBooster() {
  const [motivation, setMotivation] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const fetchMotivation = async () => {
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: 'Provide a motivational quote or success story.',
        response_type: 'text'
      });
      setMotivation(result);
    } catch (error) {
      console.error('Error fetching motivation:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(fetchMotivation);

  return (
    <div class="p-8 h-full">
      <h2 class="text-2xl font-bold mb-4 text-yellow-600">Confidence Booster</h2>

      <Show when={motivation()}>
        <div class="mt-4">
          <div class="prose max-w-none">
            <SolidMarkdown children={motivation()} />
          </div>
          <div class="mt-4 flex space-x-4">
            <button
              onClick={fetchMotivation}
              class={`px-6 py-3 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading()}
            >
              {loading() ? 'Loading...' : 'Get More Motivation'}
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default ConfidenceBooster;