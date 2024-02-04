import { publicRequest } from '../../config/axios.config'

/* list of resource */
export const index = async () => {
    return await publicRequest.get('/categories');
};

/* list of resource */
export const show = async (id) => {
    return await publicRequest.get(`/category/${id}`);
};
