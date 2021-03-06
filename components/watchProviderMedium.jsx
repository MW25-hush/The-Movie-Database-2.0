import Image from 'next/image';
import {useSelector} from 'react-redux'
import useSWR from 'swr';


function WatchProviderMedium({param}) {
  //** param parameter for the dynamic nature of the nav component it determines the value to be given to the api request */
  let genre = param == "Movies" ? 'movie' : "tv"
  
  //? providing the value from the redux store 
    const region = useSelector(state => state.country.value)

    //* adding the refresh interval due to the changing state in the countries state component  
  const {data} = useSWR(`https://api.themoviedb.org/3/watch/providers/${genre}?api_key=${process.env.NEXT_PUBLIC_APIV3}&language=en-US&watch_region=${region}`)

  if(data == undefined) return (<div className='text-center text-2xl font-bold pb-4 pt-2'>Loading...</div>)
  return (
    <div className='flex flex-wrap justify-center mt-2 overflow-auto h-64 md:w-80 md:mx-auto  '>
      {data.results.map((data ,index) => (
        <div key={index} className="px-1">
        <Image  src={`https://image.tmdb.org/t/p/w500/${data.logo_path}`} className="rounded-md  space-y-2" alt="logo" width={50} height={50} />
        </div>
      ))}
    </div>
  )
}

export default WatchProviderMedium