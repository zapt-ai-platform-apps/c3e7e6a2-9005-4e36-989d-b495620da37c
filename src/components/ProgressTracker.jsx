import { createSignal, onMount, For } from 'solid-js';
import { Chart, Title, Tooltip, Legend, ArcElement, LineElement, CategoryScale, LinearScale, BarElement, PointElement, Colors } from 'chart.js';
import { Line } from 'solid-chartjs';

function ProgressTracker() {
  const [progressData, setProgressData] = createSignal({
    labels: [],
    datasets: [
      {
        label: 'Progress Over Time',
        data: [],
        borderColor: '#4F46E5',
        backgroundColor: '#4F46E5',
        tension: 0.4,
      },
    ],
  });
  const [loading, setLoading] = createSignal(false);

  onMount(() => {
    Chart.register(Title, Tooltip, Legend, ArcElement, LineElement, CategoryScale, LinearScale, BarElement, PointElement, Colors);
    fetchProgressData();
  });

  const fetchProgressData = async () => {
    setLoading(true);
    try {
      // Fetch progress data from the backend or use dummy data
      const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Progress Over Time',
            data: [10, 25, 45, 60],
            borderColor: '#4F46E5',
            backgroundColor: '#4F46E5',
            tension: 0.4,
          },
        ],
      };
      setProgressData(data);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="p-8 h-full">
      <h2 class="text-2xl font-bold mb-4 text-indigo-600">Progress Tracker</h2>
      {loading() ? (
        <p>Loading progress data...</p>
      ) : (
        <div>
          <Line data={progressData()} options={{ responsive: true }} width={500} height={300} />
        </div>
      )}
    </div>
  );
}

export default ProgressTracker;