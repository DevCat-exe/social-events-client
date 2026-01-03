import { useEffect, useState, useContext } from "react";
import { motion } from "motion/react";
import { AuthContext } from "../providers/AuthContext";
import { getUserProfile, updateUserProfile } from "../api/eventApi";
import { User, Mail, Calendar, Edit3, Save, X } from "lucide-react";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    photoURL: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      setFormData({
        displayName: data.displayName || '',
        photoURL: data.photoURL || ''
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      Swal.fire("Error", "Failed to load profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      setProfile({ ...profile, ...formData });
      setEditing(false);
      Swal.fire("Success!", "Profile updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to update profile", "error");
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: profile.displayName || '',
      photoURL: profile.photoURL || ''
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-base-300 rounded w-1/4 mb-8"></div>
            <div className="bg-base-100 p-8 rounded-lg shadow-lg">
              <div className="h-32 bg-base-300 rounded-full w-32 mb-6 mx-auto"></div>
              <div className="space-y-4">
                <div className="h-4 bg-base-300 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-base-300 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-base-content mb-2">Profile</h1>
          <p className="text-base-content/70">
            Manage your account information and preferences.
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-base-100 rounded-lg shadow-lg p-8"
        >
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={profile.photoURL || user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.displayName || user?.displayName || 'User')}&size=128`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />
              {editing && (
                <button className="absolute bottom-0 right-0 bg-primary text-primary-content p-2 rounded-full">
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>
            <h2 className="text-2xl font-bold text-base-content mt-4">
              {profile.displayName || user?.displayName || 'User'}
            </h2>
            <p className="text-base-content/70 capitalize">{profile.role}</p>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-base-content/70 mb-1">
                  Email
                </label>
                <p className="text-base-content">{profile.email}</p>
              </div>
            </div>

            {/* Display Name */}
            <div className="flex items-center gap-4">
              <User className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-base-content/70 mb-1">
                  Display Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="Enter your display name"
                  />
                ) : (
                  <p className="text-base-content">{profile.displayName || 'Not set'}</p>
                )}
              </div>
            </div>

            {/* Photo URL */}
            <div className="flex items-center gap-4">
              <User className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-base-content/70 mb-1">
                  Profile Picture URL
                </label>
                {editing ? (
                  <input
                    type="url"
                    value={formData.photoURL}
                    onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                    className="input input-bordered w-full"
                    placeholder="https://example.com/photo.jpg"
                  />
                ) : (
                  <p className="text-base-content">{profile.photoURL || 'Not set'}</p>
                )}
              </div>
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-base-content/70 mb-1">
                  Member Since
                </label>
                <p className="text-base-content">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Last Login */}
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-base-content/70 mb-1">
                  Last Login
                </label>
                <p className="text-base-content">
                  {new Date(profile.lastLogin).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            {editing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="btn btn-ghost"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="btn btn-primary"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </motion.div>

        {/* Account Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-base-100 rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-base-content mb-4">Account Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <div className="text-base-content/70">Events Joined</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">3</div>
              <div className="text-base-content/70">Events Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">98%</div>
              <div className="text-base-content/70">Attendance Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;