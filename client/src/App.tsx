import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:6969/upload', {
        method: 'POST',
        body: new FormData(event.currentTarget),
      });

      if (response.ok) {
        const data = await response.json();
        downloadJSON(data);
      } else {
        // Display toast message for failed JSON response
        toast.error('Failed to fetch data', { position: toast.POSITION.TOP_CENTER });
      }
    } catch (error) {
      // Display toast message for fetch error
      toast.error(`Error while getting response from API: ${error}`, { position: toast.POSITION.TOP_CENTER });
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
    a.style.display = 'none';
    document.body.appendChild(a);

    a.click();

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
      <ToastContainer />
    </div>
  );
}

export default App;
