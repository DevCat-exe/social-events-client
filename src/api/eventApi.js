import axiosInstance from './axiosInstance';

// Get upcoming events with optional filter and search
export const getUpcomingEvents = async (type = '', search = '') => {
    try {
        const response = await axiosInstance.get('/events', {
            params: { type, search }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch events');
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
