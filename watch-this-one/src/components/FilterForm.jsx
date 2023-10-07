import React from "react";
import {Form} from "react-router-dom"
import {countries as countriesList}  from "../countries";
export default function FilterForm({genres,countries}){
    const [isOpen,setIsOpen] = React.useState({
        genre:false,
        country:false,
        year:false,
        sort:false
    })
    console.log(genres)
    const toggleDropdown = (dropdown) =>{
        setIsOpen((prevIsOpen) =>({
            ...prevIsOpen,
            [dropdown]:!isOpen[dropdown]
        }));
    }
    return(
        <Form method="get" action="">
            <div className="select-wrapper">

            <button className="dropdownToggle" onClick={() =>toggleDropdown("genre")} >Genre </button>
            {isOpen.genre && (
                
                <div className={`select-dropdown ${isOpen && 'open'}`}>
                {genres.map(genre =>(
                    <label id={genre.id}>
                     <input type="checkbox" name="genre" value={genre.name}/>{" "}
                 {genre.name}
                 </label>
                )

                )}
            </div>
            

            )}
           
            <button className="dropdownToggle" onClick={()=>toggleDropdown("country")} >Country </button>
            {isOpen.country && (
                
                <div className={`select-dropdown ${isOpen.country && 'open'}`}>
                {countries.map(country =>(
                    countriesList.countries.includes(country.english_name) &&
                    (<label id={country.id}>
                     <input type="checkbox" name="country" value={country.english_name}/>{" "}
                 {country.english_name}
                 </label>)
                )

                )}
            </div>
            )}

            {/* )} */}
            </div>
            {/* <select name="genre" multiple>
                <option value='comedy'>comedy</option>
                <option value='action'>action</option>
                <option value='horror'>horror</option>
            </select>
            <select name="country" multiple>
                <option value='usa'>USA</option>
                <option value='England'>England</option>
                <option value='Ethiopia'>Ethiopia</option>
            </select>
            <select name="year" multiple>
                <option value='2022'>2022</option>
                <option value='2023'>2023</option>
                <option value='2021'>2021</option>
            </select> */}
            <button type="submit">Search</button>

        </Form>
    )
}