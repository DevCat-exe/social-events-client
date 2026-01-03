import axiosInstance from './axiosInstance';

// Get upcoming events with optional filter and search
export const getUpcomingEvents = async (type = '', search = '', location = '', dateRange = '', sortBy = 'date', page = 1, limit = 9) => {
    try {
        const params = { type, search, location, dateRange, sortBy, page, limit };
        // Remove empty params
        Object.keys(params).forEach(key => params[key] === '' && delete params[key]);
        const response = await axiosInstance.get('/events', { params });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch events');
    }
};

// Get total events count
export const getTotalEventsCount = async () => {
    try {
        const response = await axiosInstance.get('/events/count');
        return response.data.total;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch total events count');
    }
};

// Create a new event
export const createEvent = async (eventData) => {
    try {
        const response = await axiosInstance.post('/events', eventData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create event');
    }
};

// Get event by ID
export const getEventById = async (id) => {
    try {
        const response = await axiosInstance.get(`/events/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch event');
    }
};

// Update event
export const updateEvent = async (id, updateData) => {
    try {
        const response = await axiosInstance.put(`/events/${id}`, updateData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update event');
    }
};

// Join an event
export const joinEvent = async (eventId, userEmail) => {
    try {
        const response = await axiosInstance.post(`/events/${eventId}/join`, { userEmail });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to join event');
    }
};

// Get events joined by a user
export const getJoinedEvents = async (email) => {
    try {
        const response = await axiosInstance.get('/users/me/joined');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch joined events');
    }
};

// Register or update user in database
export const registerUser = async () => {
    try {
        const response = await axiosInstance.post('/users');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to register user');
    }
};

// Get current user profile
export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get('/users/me');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
};

// Update current user profile
export const updateUserProfile = async (updates) => {
    try {
        const response = await axiosInstance.put('/users/me', updates);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update user profile');
    }
};

// Get all users (admin only)
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
};

// Get user by email
export const getUserByEmail = async (email) => {
    try {
        const response = await axiosInstance.get(`/users/email/${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
};

// Update user role
export const updateUserRole = async (email, role) => {
    try {
        const response = await axiosInstance.put(`/users/${email}/role`, { role });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update user role');
    }
};

// Delete user
export const deleteUser = async (email) => {
    try {
        const response = await axiosInstance.delete(`/users/${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
};

// Get events created by a user
export const getCreatorEvents = async (email) => {
    try {
        const response = await axiosInstance.get('/users/me/events');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch creator events');
    }
};

// Delete event
export const deleteEvent = async (id) => {
    try {
        const response = await axiosInstance.delete(`/events/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete event');
    }
};
