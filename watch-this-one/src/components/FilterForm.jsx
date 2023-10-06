import React from "react";
import {Form} from "react-router-dom"

export default function FilterForm(){
    const [isOpen,setIsOpen] = React.useState(false)

    const toggleDropdown = () =>{
        setIsOpen(!isOpen)
    }

    return(
        <Form method="get" action="">
            <div className="select-wrapper">

            <button className="dropdownToggle" onClick={toggleDropdown} >Genre </button>
            {isOpen && (
                
                <div className={`select-dropdown ${isOpen && 'open'}`}>
                <label>
                    <input type="checkbox" name="genre" value="comedy"/>{" "}
                Comedy
                </label>
                <label>
                    <input type="checkbox" name="genre" value="action"/>{" "}
                Action
                </label>
                <label>
                    <input type="checkbox" name="genre" value="horror"/>{" "}
                Horror
                </label>
            </div>
            )}
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