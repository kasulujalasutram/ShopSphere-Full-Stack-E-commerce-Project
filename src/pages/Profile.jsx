
import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../services/authService";

function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error("Profile loading failed:", error);
        setMessage("Unable to load profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const updatedProfile = await updateUserProfile(profile);
      setProfile(updatedProfile);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      setMessage("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 my-10 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ["first_name", "First Name"],
          ["last_name", "Last Name"],
          ["email", "Email Address"],
          ["phone", "Phone Number"],
          ["address", "Address"],
          ["city", "City"],
          ["postal_code", "Postal Code"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              name={name}
              type="text"
              value={profile[name] || ""}
              onChange={handleChange}
              readOnly={name === "email"}
              className="w-full border rounded-lg p-3"
            />
          </div>
        ))}

        {message && (
          <p className="text-sm text-blue-600">{message}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
