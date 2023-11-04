import React from "react";
import {Form} from "react-router-dom"
import {countries as countriesList}  from "../countries";

export default function FilterForm({genres,countries,onFiltersChange}){
    const [isOpen,setIsOpen] = React.useState({
        genre:false,
        country:false,
        year:false,
    })
    const [filters, setFilters] = React.useState({
        with_genres: [],
        region: [],
        year: "",
        sort_by: "popularity.desc"
      });
    const currentYear = new Date().getFullYear()
    
    const toggleDropdown = React.useCallback((dropdown) =>{
        setIsOpen((prevIsOpen) =>({
            ...prevIsOpen,
            [dropdown]:!prevIsOpen[dropdown]
        }))
    },[setIsOpen]);

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        if (type === "checkbox") {
          setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked
              ? [...(prevFilters[name]), value]
              : prevFilters[name].filter((item) => item !== value),
          }));
        } else if (name === "sort_by") {
          setFilters((prevFilters) => ({
            ...prevFilters,
            sort_by: value,
          }));
        } else {
          setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: name === "year" ? parseInt(value) : value,
          }));
        }
      };

      const yearOptions = [] 
     for (let year = 1990; year <= currentYear; year++) {
        yearOptions.push(

        (<label id={year}>
         <input type="radio" name="year" value={year} checked={filters.year === year}
          onChange={handleChange}/>{" "}
             {year}
     </label>))
        
    }

    return(
        <Form method="get" action="">
            <div className="select-wrapper">

            <button className="dropdownToggle" onClick={() =>toggleDropdown("genre")} >Genre </button>
            {isOpen.genre && (
                
                <div className={`select-dropdown ${isOpen.genre ? 'open':""}`}>
                {genres.map(genre =>(
                    <label id={genre.id}>
                     <input type="checkbox" name="with_genres" value={genre.id} checked={filters.with_genres && filters.with_genres.includes(String(genre.id))} onChange={handleChange}/>{" "}
                 {genre.name}
                 </label>
                )

                )}
            </div>
            )}
           
            {/* <button className="dropdownToggle" onClick={()=>toggleDropdown("country")} >Country </button>
            {isOpen.country && (
                
                <div className={`select-dropdown ${isOpen.country ? 'open':""}`}>
                {countries.map(country =>(
                    countriesList.countries.includes(country.english_name) &&
                    (<label id={country.id}>
                     <input type="radio" name="region" value={country.english_name} checked={filters.region && filters.region.includes(country.english_name)} onChange={handleChange}/>{" "}
                 {country.english_name}
                 </label>)
                )

                )}
            </div>
            )} */}
            <button className="dropdownToggle" onClick={()=>toggleDropdown("year")} >Year </button>
            {isOpen.year && (
                
                <div className={`select-dropdown ${isOpen.year ? 'open': ""}`}>
                    {yearOptions}
                 </div>
            )}
                <div >
                 <select name="sort_by" className="dropdownToggle sort" onChange={handleChange}>
                    <option value="popularity.desc">Popularity</option>
                    <option value="primary_release_date.desc">Release Date</option>
                    <option value="vote_average.desc">Rating</option>
                    <option value="vote-count.desc">Vote Count</option>
                </select>
                 </div>
        

            {/* )} */}
            <button className='filter-button' type="submit" onClick={() => onFiltersChange(filters)}>Filter</button>
            </div>
            

        </Form>
    )
}