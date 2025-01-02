import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe('pk_');

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
  } catch (error) {
    console.error('Error creating checkout session', error);
    showAlert('error', 'An error occurred');
  }
};
