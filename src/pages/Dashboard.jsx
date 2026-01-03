import { useEffect, useState, useContext } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { AuthContext } from "../providers/AuthContext";
import { getUserProfile, getAllUsers, getUpcomingEvents, getJoinedEvents, getTotalEventsCount, updateUserRole, deleteUser, deleteEvent } from "../api/eventApi";
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
  const [allUsers, setAllUsers] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const [recentEvents, setRecentEvents] = useState([]);

  const handleBlockUser = async (email) => {
    try {
      await updateUserRole(email, 'blocked');
      setAllUsers(allUsers.map(u => u.email === email ? { ...u, role: 'blocked' } : u));
      Swal.fire("Success", "User blocked", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleDeleteUser = async (email) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(email);
        setAllUsers(allUsers.filter(u => u.email !== email));
        Swal.fire("Success", "User deleted", "success");
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const handleDeleteEvent = async (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        setAllEvents(allEvents.filter(e => e._id !== id));
        // Also update recent events if the deleted event was in there
        setRecentEvents(recentEvents.filter(e => e._id !== id));
        Swal.fire("Success", "Event deleted", "success");
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch data in parallel
      const [profile, events, joined, totalCount, recent] = await Promise.all([
        getUserProfile(),
        getUpcomingEvents('', '', '', '', 'date', 1, 100), // General upcoming for stats/list
        user ? getJoinedEvents(user.email) : Promise.resolve([]),
        getTotalEventsCount(),
        // Fetch 3 most recent events by creation date
        getUpcomingEvents('', '', '', '', 'newest', 1, 3) 
      ]);

      setUserProfile(profile);

      let totalUsers = 0;
      let allUsersData = [];
      let allEventsData = [];
      if (profile.role === 'admin') {
        const users = await getAllUsers();
        // Filter out admin users
        allUsersData = users.filter(u => u.role !== 'admin');
        totalUsers = users.length;
        // For events, perhaps get all events, but for now, use the upcoming as all.
        allEventsData = events.events || [];
      }

      setAllUsers(allUsersData);
      setAllEvents(allEventsData);
      setRecentEvents(recent.events || []);
      setStats({
        totalEvents: totalCount,
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
            {userProfile?.role === 'admin' ? 'Admin Dashboard' : `Welcome back, ${userProfile?.displayName || user?.displayName || 'User'}!`}
          </h1>
          <p className="text-base-content/70">
            {userProfile?.role === 'admin' ? 'Manage users and events from here.' : "Here's what's happening with your events today."}
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

        {userProfile?.role === 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 flex justify-center"
          >
            <div className="flex bg-base-100 p-1.5 rounded-full shadow-lg border border-base-content/5 relative">
              {['overview', 'users', 'events'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-8 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 z-10 ${
                    activeTab === tab ? 'text-primary-content' : 'text-base-content/70 hover:text-base-content'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="capitalize">
                    {tab === 'users' ? 'Manage Users' : tab === 'events' ? 'Manage Events' : tab}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'overview' && (
          <>
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
          </>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-base-100 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold text-base-content mb-4">Manage Users</h3>
            <div className="space-y-4">
              {allUsers.map(user => (
                <div key={user.email} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div>
                    <p className="font-medium text-base-content">{user.displayName}</p>
                    <p className="text-sm text-base-content/70">{user.email}</p>
                    <p className="text-xs text-base-content/50 capitalize">{user.role}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-warning" onClick={() => handleBlockUser(user.email)}>Block</button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDeleteUser(user.email)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-base-100 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold text-base-content mb-4">Manage Events</h3>
            <div className="space-y-4">
              {allEvents.map(event => (
                <div key={event._id} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div>
                    <p className="font-medium text-base-content">{event.title}</p>
                    <p className="text-sm text-base-content/70">{event.creatorEmail}</p>
                    <p className="text-xs text-base-content/50">{new Date(event.eventDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/events/${event._id}`} className="btn btn-sm btn-info">View Details</Link>
                    <button className="btn btn-sm btn-error" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
