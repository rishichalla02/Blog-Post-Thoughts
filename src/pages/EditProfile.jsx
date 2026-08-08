import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import AnimatedPage from "../components/AnimatedPage";
import { validatePassword } from "../utils/validation";

export default function EditProfile() {
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const passwordCheck = validatePassword(form.newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword) {
      if (!form.currentPassword) {
        setError("Enter your current password to set a new one.");
        return;
      }
      if (!passwordCheck.isValid) {
        setError("New password doesn't meet the requirements below.");
        return;
      }
      if (form.newPassword !== form.confirmNewPassword) {
        setError("New passwords do not match.");
        return;
      }
    }

    setLoading(true);
    try {
      const payload = { name: form.name, bio: form.bio, avatar: form.avatar };
      if (form.newPassword) {
        payload.currentPassword = form.currentPassword;
        payload.newPassword = form.newPassword;
      }
      await updateProfile(payload);
      setSuccess("Profile updated successfully.");
      setForm({
        ...form,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Could not update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <AnimatedPage>
        <div className="max-w-md mx-auto px-6 py-20">
          <p className="text-ink/60 dark:text-paper/60">
            Please log in to edit your profile.
          </p>
          <Link to="/login" className="text-cobalt font-medium">
            Go to login
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  const checklistItem = (label, passed) => (
    <li
      className={`flex items-center gap-2 ${passed ? "text-green-600" : "text-ink/40 dark:text-paper/40"}`}
    >
      <span>{passed ? "✓" : "○"}</span> {label}
    </li>
  );

  return (
    <AnimatedPage>
      <div className="max-w-xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl font-700 mb-2">Edit profile</h1>
        <p className="text-ink/60 dark:text-paper/60 mb-8">
          Update your public info and password.
        </p>

        <img
          src={form.avatar || user.avatar}
          alt={form.name}
          className="w-16 h-16 rounded-full object-cover mb-8"
        />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-ink/15 dark:border-paper/15 bg-white dark:bg-ink/40 focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-md border border-ink/15 dark:border-paper/15 bg-white dark:bg-ink/40 focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Avatar image URL
            </label>
            <input
              type="url"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-md border border-ink/15 dark:border-paper/15 bg-white dark:bg-ink/40 focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
            />
          </div>

          <div className="pt-4 border-t border-ink/10 dark:border-paper/10">
            <p className="text-sm font-medium mb-3">
              Change password (optional)
            </p>
            <div className="space-y-4">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current password"
                value={form.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md border border-ink/15 dark:border-paper/15 bg-white dark:bg-ink/40 focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New password"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md border border-ink/15 dark:border-paper/15 bg-white dark:bg-ink/40 focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
              />
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm new password"
                value={form.confirmNewPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-md border border-ink/15 dark:border-paper/15 bg-white dark:bg-ink/40 focus:outline-none focus:ring-2 focus:ring-cobalt/40 transition-shadow duration-200"
              />
            </div>

            {form.newPassword && (
              <ul className="text-xs mt-3 space-y-1">
                {checklistItem(
                  "At least 8 characters",
                  passwordCheck.checks.length,
                )}
                {checklistItem(
                  "One uppercase letter",
                  passwordCheck.checks.upper,
                )}
                {checklistItem(
                  "One lowercase letter",
                  passwordCheck.checks.lower,
                )}
                {checklistItem("One number", passwordCheck.checks.number)}
                {checklistItem(
                  "One special character",
                  passwordCheck.checks.special,
                )}
              </ul>
            )}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-green-600"
            >
              {success}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="bg-cobalt text-paper px-6 py-2.5 rounded-md font-medium hover:bg-cobalt/90 disabled:opacity-60 transition-colors duration-200"
          >
            {loading ? "Saving..." : "Save changes"}
          </motion.button>
        </form>
      </div>
    </AnimatedPage>
  );
}
