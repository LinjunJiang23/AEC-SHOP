// src/api/services/guestServices.js
import { getLocal, setLocal } from '../utils/localUtils';


const createGuest = async () => {	
  const guest = await getLocal('guest');
  if (guest) {
	  return guest;
  } else {
    const guestName = `guest_${Date.now()}`;
    setLocal('guest', guestName);
    console.log('Guest creation request received at: ', new Date().toLocaleTimeString());
	return guestName;
  }
};

export { 
  createGuest  
};