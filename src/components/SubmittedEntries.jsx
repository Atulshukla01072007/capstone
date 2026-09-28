export function SubmittedEntries({ entries = [], onDeleteEntry, onClearAll }) {
  const getInitials = (name) => {
    if (!name) return '?'
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    } catch {
      return 'Just now'
    }
  }

  return (
    <section className="entries-container" aria-label="Submitted Messages">
      <div className="entries-header">
        <div>
          <h2>Submitted Messages</h2>
          <p className="entries-subtitle">
            {entries.length === 0
              ? 'No submissions yet'
              : `${entries.length} message${entries.length === 1 ? '' : 's'} received`}
          </p>
        </div>
        {entries.length > 0 && (
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={onClearAll}
            aria-label="Clear all messages"
          >
            Clear All
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon" aria-hidden="true">
            💬
          </div>
          <h3>No messages yet</h3>
          <p>Fill out the form above to see your submitted entries appear here in real-time.</p>
        </div>
      ) : (
        <div className="entries-list">
          {entries.map((entry) => (
            <article key={entry.id} className="entry-card">
              <div className="entry-card-header">
                <div className="entry-user-info">
                  <div className="avatar" aria-hidden="true">
                    {getInitials(entry.name)}
                  </div>
                  <div>
                    <h3 className="entry-author">{entry.name}</h3>
                    <a href={`mailto:${entry.email}`} className="entry-email">
                      {entry.email}
                    </a>
                  </div>
                </div>
                <div className="entry-meta">
                  <time dateTime={entry.submittedAt} className="entry-time">
                    {formatDate(entry.submittedAt)}
                  </time>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => onDeleteEntry(entry.id)}
                    aria-label={`Delete message from ${entry.name}`}
                    title="Delete message"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="delete-icon"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="entry-subject">
                <span className="subject-badge">Subject:</span>
                <strong>{entry.subject}</strong>
              </div>

              <p className="entry-message">{entry.message}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default SubmittedEntries
