import react from "react";
import {useForm} from "react-hook-form";


function App(){
const {register,handleSubmit,watch,formState : {errors}} = useForm();


const onsubmit = (data)=>{
  console.log(data);
}
//console.log(watch("FirstName"));
         
  return(
    <form onSubmit={handleSubmit(onsubmit)}>
      
      <label htmlFor="FirstName">FirstName </label>
      <input type="text" placeholder="Kapil" {...register("FirstName" , {required : true})}/>
      {errors.FirstName && <p>This field is required</p>}

      <label htmlFor="LastName">LastName </label>
      <input type="text" placeholder="M" {...register("LastName" ,{required:true})}/>
      {errors.LastName && <p>This field is required</p>}

      <label htmlFor="age">Age</label>
      <input  type="number" placeholder="Age" {...register("Age" ,{ required:true , min:5,max:50})}/>
      {errors.Age && <p>Age must be greater than 5 and lesser than 50</p>}
      
      <label htmlFor="email">Email</label>
      <input type="email" placeholder="youremail@gmail.com" {...register("email", {required:true})} />
      {errors.email && <p>This field is required</p>}

      <label htmlFor="password">Password</label>
      <input type="password"  placeholder="*********" {...register("password" , {pattern : {value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/} ,required:true})} />
      {errors.password && <p>Alphabet only</p>}








      <input type="submit"/>
    </form>
  )
}

export default App;