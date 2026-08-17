import { useState } from 'react';
import { Send, Star } from 'lucide-react';
import axios from 'axios';
import { useStore } from '../store/useStore';
import Toast from '../components/Toast';

const CATEGORIES = ['Health', 'Education', 'Livelihood', 'Environment'];

export default function SubmitFeedback() {
  const addEntry = useStore((state) => state.addEntry);

  const [form, setForm] = useState({
    category: '',
    activity: '',
    rating: 0,
    comment: '',
    location: '',
    date: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const next = {};
    if (!form.category) next.category = 'Pick a category';
    if (!form.activity.trim()) next.activity = 'Activity name is required';
    if (form.rating === 0) next.rating = 'Rate at least 1 star';
    if (!form.comment.trim()) next.comment = 'Comment cannot be empty';
    else if (form.comment.length > 300) next.comment = 'Keep it under 300 characters';
    if (!form.location.trim()) next.location = 'Location is required';
    if (!form.date) next.date = 'Pick a date';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600)); // fake network delay

      addEntry(form); 
      setToast({ message: 'Feedback submitted!', type: 'success' });
      setForm({ category: '', activity: '', rating: 0, comment: '', location: '', date: '' });
    } catch (err) {
      setToast({ message: 'Something went wrong. Try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-base-content mb-3 tracking-tight">Submit Feedback</h1>
        <p className="text-base-content/60 text-base max-w-lg mx-auto">
          Help us improve by sharing your experience from the latest event or activity.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-base-100/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-base-content/10 space-y-6 relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-base-content/90 mb-2">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="select select-bordered w-full bg-base-100 focus:bg-base-100 transition-colors"
          >
            <option value="" className="bg-base-100 text-base-content">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-base-100 text-base-content">{c}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-error mt-1.5">{errors.category}</p>}
        </div>

        {/* Activity name */}
        <div>
          <label className="block text-sm font-semibold text-base-content/90 mb-2">Event / Activity Name</label>
          <input
            name="activity"
            value={form.activity}
            onChange={handleChange}
            placeholder="e.g. Free Eye Checkup Camp"
            className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors"
          />
          {errors.activity && <p className="text-xs text-error mt-1.5">{errors.activity}</p>}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-base-content/90 mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setForm({ ...form, rating: star })}
                className={`transition-all hover:scale-110 active:scale-95 p-1 rounded-full ${
                  star <= form.rating ? 'text-warning' : 'text-base-300'
                }`}
              >
                <Star size={32} fill={star <= form.rating ? 'currentColor' : 'none'} strokeWidth={1.5} />
              </button>
            ))}
          </div>
          {errors.rating && <p className="text-xs text-error mt-1.5">{errors.rating}</p>}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-semibold text-base-content/90 mb-2">Comment</label>
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            rows={4}
            maxLength={300}
            placeholder="Share your experience..."
            className="textarea textarea-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors text-base"
          />
          <div className="flex justify-between mt-1.5 px-1">
            {errors.comment ? <p className="text-xs text-error">{errors.comment}</p> : <span />}
            <span className="text-xs font-medium text-base-content/40">{form.comment.length}/300</span>
          </div>
        </div>

        {/* Location + Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-base-content/90 mb-2">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="City"
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors"
            />
            {errors.location && <p className="text-xs text-error mt-1.5">{errors.location}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-base-content/90 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors"
            />
            {errors.date && <p className="text-xs text-error mt-1.5">{errors.date}</p>}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full rounded-xl text-base h-14"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                Submit Feedback
                <Send size={18} className="ml-1" />
              </>
            )}
          </button>
        </div>
      </form>

      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
    </div>
  );
}
