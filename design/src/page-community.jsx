// NAFE — Community page : posts / discussions entre fans

const { useState: useCmState } = React;

function CommunityPage({ accent }) {
  window.store.useVersion();
  const user  = window.store.currentUser();
  const posts = window.store.posts.list()
    .slice()
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  const [title,   setTitle]   = useCmState("");
  const [content, setContent] = useCmState("");
  const [busy,    setBusy]    = useCmState(false);

  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setBusy(true);
    window.store.posts.add({
      title:      title.trim(),
      content:    content.trim(),
      authorId:   user.id,
      authorName: user.username,
      likes: 0,
    });
    setTitle("");
    setContent("");
    setBusy(false);
  }

  function like(post) {
    window.store.posts.update(post.id, { likes: (post.likes || 0) + 1 });
  }

  function formatDate(ts) {
    if (!ts) return "";
    return new Date(ts).toLocaleDateString("fr-FR", {
      day: "2-digit", month: "short", year: "numeric"
    }).toUpperCase();
  }

  return (
    <div className="nafe-page">
      <section className="nafe-team__hero">
        <span className="nafe-eyebrow" style={{ color: accent }}>NAFE · Fan Zone</span>
        <h1 className="nafe-display nafe-team__title">
          COMMUNITY<span style={{ color: accent }}>.</span>
        </h1>
        <p className="nafe-team__lede">
          Espace d'échange officiel de la communauté NAFE. Partage tes analyses,
          réactions et questions directement avec les autres fans.
        </p>
      </section>

      {/* Créer un post */}
      <section className="nafe-section">
        {user ? (
          <form className="nafe-post-form nafe-clip-card" onSubmit={submit}>
            <h3 className="nafe-display nafe-post-form__title">
              NOUVEAU POST<span style={{ color: accent }}>.</span>
            </h3>
            <label className="nafe-field">
              <span className="nafe-mono nafe-field__label">Titre du post</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Que pensez-vous du dernier match ?"
                required
              />
            </label>
            <label className="nafe-field">
              <span className="nafe-mono nafe-field__label">Contenu</span>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Partage ton avis, ton analyse, ta question..."
                required
                rows={4}
              />
            </label>
            <div className="nafe-post-form__foot">
              <span className="nafe-mono" style={{ color: accent, fontSize: 11 }}>
                Posté en tant que <strong>{user.username}</strong>
              </span>
              <button
                type="submit"
                className="nafe-btn nafe-btn--accent"
                style={{ background: accent }}
                disabled={busy}
              >
                {busy ? "Publication..." : "Publier →"}
              </button>
            </div>
          </form>
        ) : (
          <div className="nafe-empty nafe-empty--panel">
            <span className="nafe-mono" style={{ color: accent }}>REJOINS LA DISCUSSION</span>
            <p className="nafe-empty__text">
              Connecte-toi pour publier un post et participer aux discussions de la communauté.
            </p>
            <button
              className="nafe-btn nafe-btn--accent"
              style={{ background: accent }}
              onClick={() => window.openAuth && window.openAuth("login")}
            >
              Se connecter →
            </button>
          </div>
        )}
      </section>

      {/* Feed de posts */}
      <section className="nafe-section">
        <header className="nafe-section__head">
          <div>
            <span className="nafe-eyebrow">Discussions</span>
            <h2 className="nafe-display nafe-section__title">Posts récents</h2>
          </div>
          <span className="nafe-mono nafe-section__count">
            {String(posts.length).padStart(2, "0")} POST{posts.length !== 1 ? "S" : ""}
          </span>
        </header>

        {posts.length === 0 ? (
          <div className="nafe-empty nafe-empty--panel">
            <span className="nafe-mono" style={{ color: accent }}>AUCUN POST</span>
            <p className="nafe-empty__text">
              Sois le premier à lancer une discussion !
            </p>
          </div>
        ) : (
          <div className="nafe-posts">
            {posts.map((post) => (
              <article key={post.id} className="nafe-post nafe-clip-card">
                <div className="nafe-post__head">
                  <div className="nafe-post__meta">
                    <span className="nafe-mono nafe-post__author" style={{ color: accent }}>
                      {post.authorName}
                    </span>
                    <span className="nafe-mono nafe-post__date">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  {window.store.isAdmin() && (
                    <button
                      className="nafe-post__del"
                      onClick={() => { if (confirm("Supprimer ce post ?")) window.store.posts.remove(post.id); }}
                      title="Supprimer"
                    >✕</button>
                  )}
                </div>
                <h3 className="nafe-display nafe-post__title">{post.title}</h3>
                <p className="nafe-post__content">{post.content}</p>
                <div className="nafe-post__foot">
                  <button
                    className="nafe-post__like"
                    onClick={() => like(post)}
                    style={{ color: accent }}
                  >
                    <span>♥</span>
                    <span className="nafe-mono">{post.likes || 0}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

window.CommunityPage = CommunityPage;
