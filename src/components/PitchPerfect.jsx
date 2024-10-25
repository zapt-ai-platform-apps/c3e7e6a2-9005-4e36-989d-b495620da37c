import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { SolidMarkdown } from 'solid-markdown';

function PitchPerfect() {
  const [pitchIdea, setPitchIdea] = createSignal('');
  const [pitch, setPitch] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleGeneratePitch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `Craft a compelling pitch for the following idea: "${pitchIdea()}". Provide it in markdown format.`,
        response_type: 'text'
      });
      setPitch(result);
    } catch (error) {
      console.error('Error generating pitch:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="p-8 h-full">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Pitch Perfect</h2>
      <form onSubmit={handleGeneratePitch} class="space-y-4">
        <textarea
          class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-green-400 focus:outline-none"
          placeholder="Describe your idea or project"
          value={pitchIdea()}
          onInput={(e) => setPitchIdea(e.target.value)}
          rows="5"
          required
        ></textarea>
        <button
          type="submit"
          class={`px-6 py-3 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading()}
        >
          {loading() ? 'Generating Pitch...' : 'Generate Pitch'}
        </button>
      </form>

      <Show when={pitch()}>
        <div class="mt-8">
          <h3 class="text-xl font-bold mb-4 text-green-600">Your Pitch</h3>
          <div class="prose max-w-none">
            <SolidMarkdown children={pitch()} />
          </div>
        </div>
      </Show>
    </div>
  );
}

export default PitchPerfect;