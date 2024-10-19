// ViewModels/BookingViewModel.js
import { useState } from 'react';
import { get_List_Appointments } from '../Services/api/apiServices';

export const useBookingViewModel = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const onSelectedItemsChange = (itemId) => {
    const newSelectedItems = selectedItems.includes(itemId)
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    setSelectedItems(newSelectedItems);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const fetchAppointments = async () => {
    const data = await get_List_Appointments();
    setAppointments(data);
  };

  return {
    selectedItems,
    selectedTime,
    appointments,
    onSelectedItemsChange,
    handleTimeSelect,
    fetchAppointments,
  };
};
