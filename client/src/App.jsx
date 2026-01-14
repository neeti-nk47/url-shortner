import { useState } from 'react';
import api from '../services/api';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);

    try {
      const response = await api.post('/shorten', { longUrl });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      console.error(err);
      setError('Failed to shorten URL. Please try again or check the URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>LinkShrink</h1>
        <p className="subtitle">Shorten your links with style.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="url"
              placeholder="Paste your long URL here..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? '...' : 'Shorten'}
            </button>
          </div>
        </form>

        {error && <div className="error">{error}</div>}

        {shortUrl && (
          <div className="result">
            <span>Your short link:</span>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="short-url">
              {shortUrl}
            </a>
            <button type="button" className="copy-btn" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
