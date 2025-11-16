import { useEffect, useState } from "react";
const LIMIT = 10;
export default function PostsLoder() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState([]);

  async function loadPosts(nextPage) {
    try {
      setLoading(true);
      setError("");

      const start = nextPage * LIMIT;

      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${LIMIT}`);

      if (!response.ok) {
        throw new Error("Loading error");
      }

     const data = await response.json();

      if (data.length < LIMIT) {
        setHasMore(false);
      }

      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const uniqueNew = data.filter((p) => !existingIds.has(p.id));
        return [...prev, ...uniqueNew];
      });

      setPage(nextPage);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(id) {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }

  function removeFavorite(id) {
    setFavoriteIds((prev) => prev.filter((favId) => favId !== id));
  }


  function clearFavorites() {
    setFavoriteIds([]);
  }

  useEffect(() => {
    loadPosts(0);
  }, []);

  const favoritePosts = posts.filter((post) => favoriteIds.includes(post.id));

  return (
    <div className="card shadow-sm max-100"  style={{borderRadius: 0}}>
       
      <div className="card-body">
        <h2 className="h4 mb-3">Пости з JSONPlaceholder</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <ul className="list-group mb-3">
          {posts.map((post) => {
            const isFavorite = favoriteIds.includes(post.id);

            return (
              <li
                key={`post-${post.id}`}
                className="list-group-item d-flex flex-column gap-1"
              >
                <div className="d-flex align-items-start gap-2">
                  <div>
                    <h5 className="mb-1">
                      {post.id}. {post.title}
                    </h5>
                    <p className="mb-0 text-muted">{post.body}</p>
                  </div>

                  <button
                    type="button"
                    className={
                      "btn btn-sm ms-auto " +
                      (isFavorite ? "btn-warning" : "btn-outline-warning")
                    }
                    onClick={() => toggleFavorite(post.id)}
                  >
                    {isFavorite ? "В обраному ★" : "В обране ☆"}
                  </button>
                </div>
              </li>
            );
          })}

          {!loading && posts.length === 0 && !error && (
            <li className="list-group-item text-center text-muted">
              Даних ще немає
            </li>
          )}
        </ul>
        <div className="d-flex align-items-center gap-2 mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => loadPosts(page + 1)}
            disabled={loading || !hasMore}
          >
            {loading ? "Завантаження..." : hasMore ? "Завантажити ще" : "Більше немає"}
          </button>

          {loading && (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

{!hasMore && !loading && (
            <span className="text-muted small">Усі пости вже завантажені</span>
          )}
        </div>

        <div className="border-top pt-3">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h3 className="h5 d-flex align-items-center gap-2 mb-0">
              Обрані пости
              <span className="badge bg-warning text-dark">
                {favoritePosts.length}
              </span>
            </h3>

            {favoritePosts.length > 0 && (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={clearFavorites}
              >
                Очистити обрані
              </button>
            )}
          </div>

          {favoritePosts.length === 0 ? (
            <p className="text-muted mb-0">
              Поки що немає обраних постів. Натисніть кнопку{" "}
              <span className="fw-semibold">“В обране”</span> біля потрібного посту.
            </p>
          ) : (
            <ul className="list-group mt-2">
              {favoritePosts.map((post) => (
                <li
                  key={`fav-${post.id}`}
                  className="list-group-item d-flex align-items-center justify-content-between"
                >
                  <span>
                    <strong>{post.id}.</strong> {post.title}
                  </span>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFavorite(post.id)}
                  >
                    Видалити
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}