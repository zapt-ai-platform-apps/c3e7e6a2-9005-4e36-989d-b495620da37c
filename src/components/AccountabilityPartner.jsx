import { createSignal, For } from 'solid-js';

function AccountabilityPartner() {
  const [reminders, setReminders] = createSignal([]);
  const [newReminder, setNewReminder] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const addReminder = (e) => {
    e.preventDefault();
    if (newReminder()) {
      setReminders([...reminders(), newReminder()]);
      setNewReminder('');
    }
  };

  return (
    <div class="p-8 h-full">
      <h2 class="text-2xl font-bold mb-4 text-pink-600">Accountability Partner</h2>
      <form onSubmit={addReminder} class="space-y-4">
        <input
          type="text"
          class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-pink-400 focus:outline-none"
          placeholder="Set a new reminder"
          value={newReminder()}
          onInput={(e) => setNewReminder(e.target.value)}
          required
        />
        <button
          type="submit"
          class={`px-6 py-3 bg-pink-500 text-white rounded-lg cursor-pointer hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105`}
        >
          Add Reminder
        </button>
      </form>

      {reminders().length > 0 && (
        <div class="mt-8">
          <h3 class="text-xl font-bold mb-4 text-pink-600">Your Reminders</h3>
          <ul class="list-disc pl-5 space-y-2">
            <For each={reminders()}>
              {(reminder) => (
                <li>{reminder}</li>
              )}
            </For>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AccountabilityPartner;