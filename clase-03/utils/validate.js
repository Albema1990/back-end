export const validateStock = (stock) => {
    if (stock == undefined || isNaN(stock) || stock < 0) 
    {
        return false;
    }else{
        return true;
    }
}