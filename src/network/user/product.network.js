import { publicRequest } from '../../config/axios.config'

/* list of resource */
export const index = async () => {
    return await publicRequest.get('/products');
};

/* list of resource */
export const show = async (id) => {
    return await publicRequest.get(`/product/${id}`);
};
