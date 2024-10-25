import { createSignal, For } from 'solid-js';
import { createEvent } from '../supabaseClient';

function ResourceLibrary() {
  const [resources, setResources] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: 'Provide a list of resources relevant to achieving ambitious financial goals. Format as a JSON array under the key "resources", each resource having "title", "description", and "link".',
        response_type: 'json'
      });
      setResources(result.resources || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="p-8 h-full">
      <h2 class="text-2xl font-bold mb-4 text-teal-600">Resource Library</h2>
      <button
        onClick={fetchResources}
        class={`px-6 py-3 bg-teal-500 text-white rounded-lg cursor-pointer hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading()}
      >
        {loading() ? 'Fetching Resources...' : 'Load Resources'}
      </button>

      {resources().length > 0 && (
        <div class="mt-8 space-y-4">
          <For each={resources()}>
            {(resource) => (
              <div class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                <h3 class="text-lg font-semibold text-teal-600">{resource.title}</h3>
                <p class="text-gray-700">{resource.description}</p>
                <a href={resource.link} target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">Access Resource</a>
              </div>
            )}
          </For>
        </div>
      )}
    </div>
  );
}

export default ResourceLibrary;