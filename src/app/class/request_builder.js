export class Expense{
    constructor(data){
        this.id_request = data.id_request
        this.user_id_request = data.user_id
        this.area_request = data.area_id
        this.currency = data.currency
        this.account_group = data.account_group
        this.cross_charge = data.cross_charge
        this.motive = data.motive
        this.observations = data.observations
        this.status_request = data.status_request
        this.date_request = data.date_request
        this.bank = data.bank
    };
};


export class Ticket{
    constructor(data){
        this.id_request = data.id_request
        this.id_ticket = data.id_ticket
        this.ammount = data.ammount
        this.expense = data.expense
        this.date_ticket = data.date_ticket
    }
}