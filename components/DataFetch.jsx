
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchCard from './searchCard'; 
import spinner from '../public/spinner.svg'
import useFetch from '../utils/useFetch';

// router query param is not finished !!!!!!!!!!

function DataFetch() {

        // fetching the data from the router query params 
      const router = useRouter();
      const routerValue = router.query.value;
     
       
    // taking the the inputValue from the locatStorage due to the preistency 
    let checkout = typeof window !== 'undefined' ? localStorage.getItem('inputValue').trim() :''
    

    // swrHook returning the value 
    const {user} = useFetch('Movie and Tv Shows',
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_APIV3}&language=en-US&query=${checkout}&page=1&include_adult=false`
    );

    // movie stroage 
    const [movieStroage, setMovieStorage] = useState([])  
    
    // useEffect Hook for validating the user 
    useEffect(() => {
        if(user !== undefined) setMovieStorage(user.results)
    },[user])
   
  // error handling for cientside 
    if( user === undefined ) return( <div className="flex justify-center items-center h-screen"><Image src={spinner} className="" alt="spinner"/></div>)
  return (
          //making the mobile first toggle button and design then going for the larger screens 
        <div className='' >
            <SearchCard posts={movieStroage} hidingTheValue={false} text={'list of Movies and Tv shows for'} value={routerValue}/> 
        </div>
  )
}

export default DataFetch;

