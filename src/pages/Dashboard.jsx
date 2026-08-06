import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockPosts } from "../data/mockData";

export default function Dashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState(
    mockPosts.filter((p) => p.author.name === user?.name),
  );

  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p._id !== id));
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-ink/60">Please log in to view your dashboard.</p>
        <Link to="/login" className="text-cobalt font-medium">
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center gap-4 mb-12">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h1 className="font-display text-2xl font-700">{user.name}</h1>
          <p className="text-ink/60 text-sm">{user.bio}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-600">Your posts</h2>
        <Link
          to="/create"
          className="bg-cobalt text-paper px-4 py-2 rounded-md text-sm font-medium hover:bg-cobalt/90"
        >
          New post
        </Link>
      </div>

      <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
        {posts.length === 0 ? (
          <p className="text-ink/50 py-6 font-mono text-sm">
            You haven't published anything yet.
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="font-medium">{post.title}</p>
                <span className="font-mono text-xs text-ink/50">
                  {post.category}
                </span>
              </div>
              <div className="flex gap-3">
                <button className="text-sm text-cobalt font-medium">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-sm text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
