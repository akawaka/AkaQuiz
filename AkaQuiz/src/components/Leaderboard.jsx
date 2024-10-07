import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('username, score')
        .order('score', { ascending: false })
        .limit(10);

      if (error) {
        console.log('Error fetching leaderboard:', error);
      } else {
        setLeaderboard(data);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index} className="flex justify-between">
            <span>{entry.username}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Leaderboard;
