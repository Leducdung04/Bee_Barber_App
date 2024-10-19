export class AppointmentScreen{
    constructor(_id, barber_id, ures_id, sevices_id, appointment_time, appointment_date, status, price){
        this._id = _id;
        this.barber_id = barber_id;
        this.ures_id = ures_id;
        this.sevices_id = sevices_id;
        this.appointment_time = appointment_time;
        this.appointment_date = appointment_date;
        this.status = status;
        this.price = price;
    }
}