import react from "react"
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import YupPassword from 'yup-password';
YupPassword(yup);


const Schema = yup.object().shape({
    firstname : yup.string().required("firstname is mandatory"),
    lastname : yup.string().required("lastname is mandatory"),
    email : yup.string().email("enter valid email").required("enter email"),
    age : yup.number().min(5, "minimum age  is 5").max(50, "Maximum age is 50").required("age is mandatory").typeError('age is mandatory'),
    date : yup.string().required("date is mandatory"),
    password : yup.string().password().required("password is mandatory").min(8,"Minimum 8 chars").max(16, "maximum 16 chars"),
    confirmpassword: yup.string().oneOf([yup.ref("password"),null],"password must match")
});

function Formfn(){
const {register,handleSubmit,formState : {errors , isValid}} =useForm({
    resolver : yupResolver(Schema),
    mode : "onChange"
});


const onsubmit = (data)=>{
   console.log(data);
}
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