import { publicRequest } from '../../config/axios.config'

/* list of resource */
export const index = async () => {
    return await publicRequest.get('/designation');
};

