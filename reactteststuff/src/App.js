import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(
    'Give me 5 brief one sentence steps to become a aerospace engineer. format your response in this way: step1;step2;step3;step4'
  );
  const [response, setResponse] = useState('');

  const handlePostRequest = () => {
    // Example data to send to the backend
    const requestData = { message: "Answer in 5-10 ONE LINE SENTENCES and Make sure to format your response to the question in this way: step1;step2;step3;step4. Question:"+data };

    // Make a POST request to your Python server (adjust URL accordingly)
    axios.post('http://localhost:5000/api', requestData)
      .then((res) => {
        // Handle response from the backend
        setResponse(res.data.response.split(';'));
      })
      .catch((err) => {
        console.error("Error:", err);
        setResponse('Error occurred');
      });
  };

  return (
    <div>
      <h1>React and Python Example</h1>
      
      {/* Text box to display and modify requestData */}
      <textarea
        value={data} // Set the value to the state 'data'
        onChange={(e) => setData(e.target.value)} // Update 'data' when the text changes
        rows="6"
        cols="50"
      />
      
      <button onClick={handlePostRequest}>Send POST Request</button>
      
      <p>Response from backend:</p>
      <ul>
        {response.length > 0 ? (
          response.map((res, idx) => <li key={idx}>{res}</li>) // Render each item in response
        ) : (
          <li>No response yet.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
