export default function PostsList({ posts, favoriteIds, toggleFavorite, loading, error }) {
  return (
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
  );
}