import { useEffect, useState, useContext } from "react";
import { motion } from "motion/react";
import { AuthContext } from "../providers/AuthContext";
import { getUserProfile, getAllUsers, getUpcomingEvents, getJoinedEvents } from "../api/eventApi";
import { Calendar, Users, MapPin, TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    joinedEvents: 0,
    totalUsers: 0,
    upcomingEvents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [profile, events, joined] = await Promise.all([
        getUserProfile(),
        getUpcomingEvents('', '', '', '', 'date', 1, 100),
        user ? getJoinedEvents(user.email) : Promise.resolve([])
      ]);

      setUserProfile(profile);

      let totalUsers = 0;
      if (profile.role === 'admin') {
        const users = await getAllUsers();
        totalUsers = users.length;
      }

      setStats({
        totalEvents: events.total || events.length,
        joinedEvents: joined.length,
        totalUsers,
        upcomingEvents: events.events?.filter(e => new Date(e.eventDate) > new Date()).length || 0
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-base-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-base-100 p-6 rounded-lg">
                  <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-base-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-base-content mb-2">
            Welcome back, {userProfile?.displayName || user?.displayName || 'User'}!
          </h1>
          <p className="text-base-content/70">
            Here's what's happening with your events today.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-base-100 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/70 text-sm">Total Events</p>
                <p className="text-3xl font-bold text-primary">{stats.totalEvents}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="bg-base-100 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/70 text-sm">Joined Events</p>
                <p className="text-3xl font-bold text-secondary">{stats.joinedEvents}</p>
              </div>
              <Users className="w-8 h-8 text-secondary" />
            </div>
          </div>

          {userProfile?.role === 'admin' && (
            <div className="bg-base-100 p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content/70 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-accent">{stats.totalUsers}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </div>
          )}

          <div className="bg-base-100 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/70 text-sm">Upcoming Events</p>
                <p className="text-3xl font-bold text-info">{stats.upcomingEvents}</p>
              </div>
              <MapPin className="w-8 h-8 text-info" />
            </div>
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Event Categories Chart */}
          <div className="bg-base-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-base-content mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Event Categories
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base-content">Community</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-primary h-2 rounded"></div>
                  <span className="text-sm text-base-content/70">35%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content">Education</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-secondary h-2 rounded"></div>
                  <span className="text-sm text-base-content/70">25%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content">Health</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 bg-accent h-2 rounded"></div>
                  <span className="text-sm text-base-content/70">20%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content">Environment</span>
                <div className="flex items-center gap-2">
                  <div className="w-8 bg-info h-2 rounded"></div>
                  <span className="text-sm text-base-content/70">20%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-base-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-base-content mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Activity
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base-content">Jan</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-primary h-3 rounded"></div>
                  <span className="text-sm text-base-content/70">24</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content">Feb</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-secondary h-3 rounded"></div>
                  <span className="text-sm text-base-content/70">18</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content">Mar</span>
                <div className="flex items-center gap-2">
                  <div className="w-28 bg-accent h-3 rounded"></div>
                  <span className="text-sm text-base-content/70">32</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content">Apr</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-info h-3 rounded"></div>
                  <span className="text-sm text-base-content/70">14</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-base-100 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold text-base-content mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-base-content font-medium">Joined "Community Garden Workshop"</p>
                <p className="text-base-content/70 text-sm">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <div className="flex-1">
                <p className="text-base-content font-medium">Created new event "Tech Meetup"</p>
                <p className="text-base-content/70 text-sm">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <div className="flex-1">
                <p className="text-base-content font-medium">Updated profile information</p>
                <p className="text-base-content/70 text-sm">3 days ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;