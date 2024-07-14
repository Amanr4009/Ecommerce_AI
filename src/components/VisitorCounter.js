import React, { useState, useEffect } from 'react';
import './VisitorCounter.css';

const VisitorCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getVisitorCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/visitors');
        const data = await response.json();
        setCount(data.count);
        await fetch('http://localhost:5000/api/visitors/increment', {
          method: 'POST',
        });
      } catch (error) {
        console.error('Error fetching visitor count:', error);
      }
    };

    getVisitorCount();
  }, []);

  return (
    <div className="visitor-counter">
      Visitors: {count}
    </div>
  );
};

export default VisitorCounter;
