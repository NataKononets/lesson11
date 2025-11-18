import { useEffect, useState } from "react";
import PostsList from "./components/PostsList.jsx";
import FavoriteList from "//components/FavoriteList.jsx";

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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
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

  const favoritePosts = posts.filter((post) =>
    favoriteIds.includes(post.id)
  );

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Пости з JSONPlaceholder</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <PostsList
          posts={posts}
          favoriteIds={favoriteIds}
          toggleFavorite={toggleFavorite}
          loading={loading}
          error={error}
        />
        <div className="d-flex align-items-center gap-2 mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => loadPosts(page + 1)}
            disabled={loading || !hasMore}
          >
            {loading
              ? "Завантаження..."
              : hasMore
              ? "Завантажити "
              : "Більше немає!!!"}
          </button>

          {loading && (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

          {!hasMore && !loading && (
            <span className="text-muted small">
              Усі пости вже завантажені
            </span>
          )}
        </div>

        <FavoriteList
          favoritePosts={favoritePosts}
          removeFavorite={removeFavorite}
          clearFavorites={clearFavorites}
        />
      </div>
    </div>
  );
}


