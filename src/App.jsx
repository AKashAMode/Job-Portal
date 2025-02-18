import React, { useState, useEffect } from 'react'
import {JOBS}  from "./configs"
 



const App = () => {

  const [searchText, setSearchText] = useState("");
  const [filterJobs, setFilterJobs] = useState(JOBS);
  const [filterCity, setFilterCity] = useState("");
  const [jobType, setJobType] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {

    if(!searchText){
      setFilterJobs(JOBS);
      return;
    }

    const temFilterJobs = JOBS.filter((job) => {
       
      if(job.job_title.toLocaleLowerCase().includes(searchText)){
        return true;
      }else if(job.company_name.toLocaleLowerCase().includes(searchText)){
        return true;
      }else if(job.location.toLocaleLowerCase().includes(searchText)){
        return true;
      }else{
        return false;
      }
    })

    setFilterJobs(temFilterJobs);

  }, [searchText])





  useEffect(() => {

    if(!filterCity && !jobType){
      setFilterJobs(JOBS)
      return;
    }


    const filterByCity = JOBS.filter((jobs) => {

      if(filterCity && jobs.location.includes(filterCity) && jobType && jobs.job_type === jobType){
        return true
      }

      if(jobType && !filterCity && jobs.job_type === jobType){
        return true;
      }

      if(filterCity && !jobType && jobs.location.includes(filterCity)){
        return true;
      }


    });

    setFilterJobs(filterByCity);
  }, [filterCity, jobType]);





  useEffect(() => {

  const tempShortedJobs = filterJobs.sort((a, b) => {

    if(sortOrder === "asc"){
      return a.job_title.localeCompare(b.job_title);
    }else{
      return b.job_title.localeCompare(a.job_title);
    }
  });
   
  setFilterJobs([...tempShortedJobs]);
  }, [sortOrder])
 

  return (
    <div className='bg-slate-100 p-10'>
      <h1 className='text-center text-2xl font-bold'>SEARCH FILTER SHORT</h1>
      <div className='h-36 flex justify-center'>
        <div>
        <input type="text" 
        className='w-[55rem] p-2 m-2 border-2 bg-white focus:outline-none rounded-lg' 
        placeholder='search'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value.toLocaleLowerCase())}/>

         {searchText ? <p className='text-center my-2 '>
          {filterJobs.length === 0 ? "Oops no jobs result found try another search" : `Found ${filterJobs.length} Jobs Search Results....`}
         </p> : null}

         <div className='flex justify-around my-2'>
          <div>
            <span>Filter By City : </span>
            <select className='bg-white text-lg my-2 p-1 
            focus:outline-none cursor-pointer w-34 rounded-lg px-5'
            value={filterCity} onChange={(e) => setFilterCity(e.target.value)}> 
              <option value="">All</option>
              {
                JOBS.map((jobs) => {
                    return <option key={jobs.location} value={jobs.location} >{jobs.location}</option>
                })
              }
            </select>
          </div>
          <div>
            <span>Filter By Job : </span>
            <select className='bg-white text-lg my-2 p-1 
            focus:outline-none cursor-pointer rounded-lg px-5'
            value={jobType} onChange={(e) => setJobType(e.target.value)}> 
              <option value="">All</option>
              {/* {
                JOBS.map((jobs) => {
                  return <option key={jobs.job_type} value={jobs.job_type}>{jobs.job}</option>
                })
              } */}
              <option value="Full-Time">Full-Time</option>
              <option value="Remote">Remote</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>
          <div>
            <span>Sort By Job Title : </span>
            <select className='bg-white text-lg my-2 p-1 focus:outline-none cursor-pointer rounded-lg px-5'
            value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
         </div>
        </div>
      </div>
      <div className='flex justify-evenly flex-wrap mt-8'>
        {filterJobs.map((jobsData, index) => {
         const {job_title, company_name,company_logo, location,salary, job_type} = jobsData;
         
            return (
            <>
              <div className="bg-white p-6 mb-10 rounded-2xl shadow-lg w-96" key={index}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white text-xl font-bold rounded-full">
                {company_logo}
                </div>
                <div className="ml-4">
                <div className="text-lg font-semibold text-gray-800">{job_title}</div>
                <div className="text-sm text-gray-600">{company_name}</div>
                </div>
              </div>

              <div className="text-gray-700 space-y-2">
                <p>📍 <strong>Location:</strong> {location}</p>
                <p>💰 <strong>Salary:</strong> {salary}</p>
                <p>🕒 <strong>Job Type:</strong> {job_type}</p>
              </div>

              <a href="#" className="block mt-4 bg-blue-700 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-900">
                Apply Now
              </a>
              </div>
            </>
            )

        })}
      </div>
    </div>
  )
}

export default App;

