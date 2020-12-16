import BaseService from './baseService';
import API from '../config/rest';

const showSpotParkir = () => {
  return BaseService.get(API.SHOW_SPOT_PARKIR);
};

export default { showSpotParkir };
