// ViewModels/BookingViewModel.js
import { useState } from 'react';
import { get_List_Appointments } from '../Services/api/apiServices';

export const useBookingViewModel = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTime, setSelectedTime] = useState(false);
  const [selectedDay, setselectedDay] = useState(false)
  const [appointments, setAppointments] = useState([]);
  const [methodPay, setmethodPay] = useState(0)
  const [selectedStylist, setselectedStylist] = useState(false)

  const [selectedService, setselectedService] = useState(false)





  const onSelectedItemsChange = (itemId) => {
    const newSelectedItems = selectedItems.includes(itemId)
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems,itemId];
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
    methodPay,
    selectedDay,
    setselectedDay,
    selectedStylist,
    setselectedStylist,
    setmethodPay,
    onSelectedItemsChange,
    handleTimeSelect,
    fetchAppointments,
    selectedService,
    setselectedService,
  };
};
