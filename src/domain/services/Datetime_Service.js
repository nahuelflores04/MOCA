import moment from 'moment'

export const getDate = async()=>{
    return moment().format('DD/MM/YYYY')
}