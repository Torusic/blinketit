import Axios from './Axios';
import SummaryApi from '../common/SummaryApi';

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDetails
        });
        return response.data
    } catch (error) {
        return {
            message: error.message || error,
            error: true,
            success: false
        };
    }
};

export default fetchUserDetails;
