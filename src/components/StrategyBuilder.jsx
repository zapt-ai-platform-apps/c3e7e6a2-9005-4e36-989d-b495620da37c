import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { SolidMarkdown } from 'solid-markdown';

function StrategyBuilder() {
  const [strategy, setStrategy] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleGenerateStrategy = async () => {
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: 'Generate a comprehensive strategy for my goal in markdown format.',
        response_type: 'text'
      });
      setStrategy(result);
    } catch (error) {
      console.error('Error generating strategy:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="p-8 h-full">
      <h2 class="text-2xl font-bold mb-4">Strategy Builder</h2>
      <button
        onClick={handleGenerateStrategy}
        class={`px-6 py-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading()}
      >
        {loading() ? 'Generating Strategy...' : 'Generate Strategy'}
      </button>

      {strategy() && (
        <div class="mt-8">
          <h3 class="text-xl font-bold mb-4">Your Strategy</h3>
          <div class="prose">
            <SolidMarkdown children={strategy()} />
          </div>
        </div>
      )}
    </div>
  );
}

export default StrategyBuilder;