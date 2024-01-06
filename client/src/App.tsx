import React, { useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Hit the server with a POST request
      const response = await fetch('http://localhost:6969/upload', {
        method: 'POST',
        body: new FormData(event.currentTarget),
      });

      if (response.ok) {
        // Assuming the response is a JSON payload, you can download it as a file
        const data = await response.json();
        downloadJSON(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = (data: any) => {
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.style.display = 'none'; // Hide the link
    document.body.appendChild(a);

    // Trigger a click on the link
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="App">
      <div className="center">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="file" name="file" />
          <input type="submit" value="Submit" />
        </form>
        {loading && <div className="spinner"></div>}
      </div>
    </div>
  );
}

export default App;
