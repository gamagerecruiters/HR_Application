import axios from "axios";
import { base_url } from "utils/base_url.js";
import { config } from "utils/axiosConfig.js";

const adminGetAllApplications = async () => {
  try {
    const response = await axios.get(
      `${base_url}/applications/admin-getAll`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const userGetAllApplications = async () => {
  try {
    const response = await axios.get(
      `${base_url}/applications/user-getAll`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const userDeleteApplication = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}/applications/delete-job/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createApplication = async (data) => {
  try {
    const response = await axios.post(
      `${base_url}/applications/post`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const applicationService = {
  adminGetAllApplications,
  userGetAllApplications,
  userDeleteApplication,
  createApplication,
};

export default applicationService;
