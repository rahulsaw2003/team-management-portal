import axios from 'axios';

const serverUrl = "https://user-management-server-kuxo.onrender.com"; [Production]
// const serverUrl = "http://localhost:5000";  // [Development]

export const createUser = async(user)=>{
    try {
        const response = await axios.post(`${serverUrl}/api/users/create`, user);
        // console.log("User created successfully at API", response);
        return response;
    } catch (error) {
        console.log("Error while calling createUser API ", error);
    }
}

export const getAllUsers = async()=>{
    try {
        const response = await axios.get(`${serverUrl}/api/users`);
        // console.log("All Users data retrived successfully at API", response);
        return response;
    } catch (error) {
        console.log("Error while calling getAllUsers API ", error);
    }
}

export const getUniqueUsers = async()=>{
    try {
        const response = await axios.get(`${serverUrl}/api/users/unique`);
        // console.log("Unique Users data retrived successfully at API", response);
        return response;
    } catch (error) {
        console.log("Error while calling getUniqueUsers API ", error);
    }
}


export const getOneUser = async(id)=>{
    try {
        const response = await axios.get(`${serverUrl}/api/users/${id}`);
        // console.log("User data retrived successfully at API", response);
        return response;
    } catch (error) {
        console.log("Error while calling getOneUser API ", error);
    }
}


export const updateUser = async(user)=>{
    try {
        const response = await axios.put(`${serverUrl}/api/users/update/${user._id}`, user);
        // console.log("User updated successfully at API", response);
        return response;
    } catch (error) {
        console.log("Error while calling updateUser API ", error);
    }
};

export const deleteUser = async(id)=>{
    try {
        const response = await axios.delete(`${serverUrl}/api/users/delete/${id}`);
        // console.log("User deleted successfully at API", response);
        return response;
    } catch (error) {
        console.log("Error while calling deleteUser API ", error);
    }
};

export const createTeam = async(team)=>{
    try {
        const response = await axios.post(`${serverUrl}/api/teams/create`, team);
        // console.log("Team created successfully at API", response);
        return response;
    } catch (error) {
        console.log("Error while calling createTeam API ", error);
    }
}

export const getTeams = async()=>{
    try {
        const response = await axios.get(`${serverUrl}/api/teams/all`);
        // console.log("All Teams data retrived successfully at API", response);
        return response;
    } catch (error) {
        console.log("Error while calling getTeams API ", error);
    }
}

export const getOneTeam = async(id)=>{
    try {
        const response = await axios.get(`${serverUrl}/api/teams/${id}`);
        // console.log("One Team data retrived successfully at API", response);
        return response;
    } catch (error) {
        console.log("Error while calling getOneTeam API ", error);
    }
}

export const deleteTeam = async(id)=>{
    try {
        const response = await axios.delete(`${serverUrl}/api/teams/delete/${id}`);
        // console.log("Team deleted successfully at API", response);
        return response;
    } catch (error) {
        console.log("Error while calling deleteTeam API ", error);
    }
}