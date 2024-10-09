import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import PropTypes from 'prop-types';
import Table from './foundations/Table';
import Modal from './foundations/Modal';

const Leaderboard = ({ onClose }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch leaderboard rankings
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

  // Transform leaderboard data into rows for the table
  const headers = ['Username', 'Score'];
  const rows = leaderboard.map((entry) => [entry.username, entry.score]);

  return (
    <Modal
      title="Leaderboard"
      content={<Table headers={headers} rows={rows} />}
      onClose={onClose}
    />
  );
};

Leaderboard.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Leaderboard;
