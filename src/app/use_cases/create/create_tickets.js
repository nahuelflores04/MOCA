import { addTicket } from "../../../infrastructure/databases/sql/users/sqlUsersMain.js";
import { Ticket } from "../../class/request_builder.js";

export const getDataTicket = async(data)=>{
    try {
        const tickets = Object.keys(data)
        .filter(key => key.startsWith('tk-'))
        .reduce((result, key) => {
            const [id, field] = key.split('-').slice(1);
            const ticket = result.find(t => t.id === id) || { id, date: null, ammount: null };
            ticket[field] = data[key];
            if (!result.includes(ticket)) result.push(ticket);
            return result;
        }, []);
        return tickets
    } catch (error) {
        return false
    };
};

export const processTicket = async(expense, tickets)=>{
    try {
        for(let i=0; i < tickets.length; i++){
            let ticket_array = {
                id_request: expense.id_request,
                id_ticket: tickets[i].id,
                ammount: tickets[i].ammount,
                expense: tickets[i].expend,
                date_ticket: expense.date_request
            };
            const ticket = new Ticket(ticket_array)
            await addTicket(ticket)
        };
        return true
    } catch (error) {
        console.log(error)
        return false
    };
};