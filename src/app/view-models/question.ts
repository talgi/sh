
export interface Option
{
    Id:number;
    value:string;
}


export interface Question 
{
    Id:number;
    options : Option[];
}