import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { Mail, Edit2 } from 'lucide-react';

const UserProfile = () => {

  const { user } = useAuth();

  if (!user) return <div className="text-center py-20">Loading profile...</div>;
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
          {/* Header Background */}
          <div className="h-40 bg-slate-950/80 to-purple-600">
            <div className="flex justify-end p-4">
              <Link
                to="*"
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
              >
                <Edit2 className="h-4 w-4" /> Edit Profile
              </Link>
            </div>
          </div>

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white flex items-center justify-center text-4xl font-bold text-indigo-600 shadow-md">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Name & Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
              <p className="text-indigo-600 font-medium mt-1">{`username : ${user.username}`}</p>
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard icon={<Mail className="h-5 w-5" />} label="Email Address" value={user.email} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable component for displaying user info rows
const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <div className="p-2 bg-white rounded-lg text-indigo-500 shadow-sm">
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{label}</p>
      <p className="text-sm font-medium text-slate-800">{value}</p>
    </div>
  </div>
);

export default UserProfile;