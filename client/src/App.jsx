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
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md border border-green-500 p-8 rounded shadow-[0_0_15px_rgba(34,197,94,0.5)] bg-black relative overflow-hidden">
        {/* Matrix rain effect simplified as a subtle gradient or overlay could be added here later */}

        <h1 className="text-4xl font-bold mb-2 text-center text-green-400 tracking-wider uppercase drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]">LinkShrink</h1>
        <p className="text-green-700 text-center mb-8 text-sm uppercase tracking-widest">Enter the Matrix</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <input
              type="url"
              placeholder="Paste your long URL here..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
              className="bg-black border border-green-800 text-green-400 placeholder-green-800 p-3 w-full focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(74,222,128,0.3)] transition-all rounded-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-900/20 border border-green-600 text-green-400 hover:bg-green-500 hover:text-black uppercase tracking-widest px-4 py-3 font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(74,222,128,0.6)]"
            >
              {loading ? 'Processing...' : 'Shorten'}
            </button>
          </div>
        </form>

        {error && <div className="mt-4 p-2 border border-red-500 text-red-500 bg-red-900/10 text-center text-sm">{error}</div>}

        {shortUrl && (
          <div className="mt-8 p-4 border border-green-500/50 bg-green-900/10 rounded animate-pulse">
            <span className="block text-xs text-green-600 uppercase mb-1">Target Acquired:</span>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="block text-xl text-green-300 hover:text-white underline break-all mb-4 font-bold">
              {shortUrl}
            </a>
            <button
              type="button"
              className="w-full bg-transparent border border-green-700 text-green-600 text-xs hover:border-green-400 hover:text-green-400 py-1 transition-colors uppercase"
              onClick={handleCopy}
            >
              {copied ? 'Copied to System' : 'Copy to Clipboard'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
