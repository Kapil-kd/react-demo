import react from "react"
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import { useState } from "react";
import YupPassword from 'yup-password';
YupPassword(yup);


const Schema = yup.object().shape({
    firstname : yup.string().required("firstname is mandatory"),
    lastname : yup.string().required("lastname is mandatory"),
    email : yup.string().email("enter valid email").required("enter email"),
    age : yup.number().min(5, "minimum age  is 5").max(50, "Maximum age is 50").required().typeError('age is mandatory'),
    date : yup.string().required("date is mandatory"),
    state : yup.string().required("Select State"),
    city : yup.string().required("Select City"),
    password : yup.string().password().required().min(8,"Minimum 8 chars").max(16, "maximum 16 chars"),
    confirmpassword: yup.string().oneOf([yup.ref("password"),null],"password must match")
});

function Formfn(){
const {register,handleSubmit,formState : {errors,isValid}} =useForm({
    resolver : yupResolver(Schema),
    mode : "onChange"
});

const onsubmit = (data)=>{
   console.log(data);
}

 const City =[
    {
        id:1,
        state:"Tamilnadu",
        city:"Chennai",
     },
    {
        id:2,
        state:"Tamilnadu",
        city:"Madurai",
     },  
    {
        id:3,
        state:"Kerala",
        city:"Alappuzha",
     },  
    {
        id:4,
        state:"Kerala",
        city:"Thrissur",
     },  
 ];

 const State =[
    {
        id:1,
        state:"Tamilnadu"
    },
    {
        id:2,
        state:"Kerala"
    }
 ]
     
const Statefn =()=>State.map(x => <option key={x.id}>{x.state}</option>)

const [state,setState] =useState("");

const Cityfn = ()=>City.filter(item => state == item.state).map(value => <option key={value.id}>{value.city}</option>)

return(
    <div className="form">
        <h1>Sign Up</h1>

        <div className="inputform">
         <form onSubmit={handleSubmit(onsubmit)}>
            <input  {...register("firstname")}  placeholder="first_name"/>
            <p className="error">{errors.firstname?.message}</p>
            <input  {...register("lastname")} placeholder="last_name"/>
            <p className="error">{errors.lastname?.message}</p>
            <input  {...register("email")} type="email" placeholder="youremail@gmail.com"/>
            <p className="error">{errors.email?.message}</p>
            <input  {...register("age")} type="number" placeholder="age"/>
            <p className="error">{errors.age?.message}</p>
            <input  {...register("date")} type="date" placeholder="dob" className="date"/>
            <p className="error">{errors.date?.message}</p>
            <select {...register("state")} value={state} onChange={(e)=>setState(e.target.value)}>
                <option>select state</option>
                <Statefn/>
            </select>
            <p className="error">{errors.state?.message}</p>
            <select {...register("city")} >
                <option>select city</option>
               <Cityfn/>
            </select>
            <p className="error">{errors.city?.message}</p>
            <input  {...register("password")} type="password" placeholder="password" />
            <p className="error">{errors.password?.message}</p>
            <input  {...register("confirmpassword")} type="password" placeholder="confirm password" />
            <p className="error">{errors.confirmpassword?.message}</p>
            <input className="button" type="submit" disabled={!isValid}/>
         </form>
        </div>

    </div>
)
}
export default Formfn;