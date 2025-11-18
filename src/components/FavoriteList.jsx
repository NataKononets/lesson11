export default function FavoriteList({ favoritePosts, removeFavorite, clearFavorites })
    {
    return (
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
    )
}