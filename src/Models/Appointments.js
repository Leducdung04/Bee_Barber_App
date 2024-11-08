export class AppointmentScreen {
    constructor(barber_id, user_id, service_id, appointment_time, appointment_date, status, price, createdAt) {
        this.barber_id = barber_id;
        this.user_id = user_id;
        this.service_id = service_id;
        this.appointment_time = appointment_time;
        this.appointment_date = appointment_date;
        this.status = status;
        this.price = price;
        this.createdAt = createdAt;
    }
}