import dateFormat from "dateformat";

export const formattedDeadline = (date)=>{
    return dateFormat((date), "mmmm dS, yyyy, h:MM TT")
}

export const formattedCreatedAt = (date) =>{
    const currentDate = new Date();
    const createdAtDate = new Date(date);
    const timeDifference = currentDate - createdAtDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let myFormattedCreatedAt;
    if (daysDifference === 0) {
        myFormattedCreatedAt = "Today";
    } else if (daysDifference === 1) {
        myFormattedCreatedAt = "Yesterday";
    } else if (daysDifference === 2) {
        myFormattedCreatedAt = "Day before yesterday";
    } else {
        myFormattedCreatedAt = dateFormat((createdAtDate), "M/d/yyyy");
    }
    return myFormattedCreatedAt;
}