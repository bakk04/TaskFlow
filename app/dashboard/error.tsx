'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Une erreur est survenue</h2>
      <p style={{ color: 'red' }}>{error.message}</p>
      <button onClick={() => reset()} style={{
        padding: '8px 16px', background: '#1B8C3E', color: 'white',
        border: 'none', borderRadius: 4, cursor: 'pointer'
      }}>
        Réessayer
      </button>
    </div>
  );
}
