import React, { useContext } from 'react'
import { SearchContext } from '../Context/Context'
import SearchStyle from './Search.module.css'
import { Link, useParams } from 'react-router-dom'

export default function Search() {
    const {dataApi , dataTv } = useContext(SearchContext);
    let { id, media } = useParams();
return (
    <div className='container my-5 py-3'>
        <div className="row">
            {dataApi?.map((allData , index)=>{
                return <div key={index} className="col-md-3">
                    <Link to={`/details/movie/${allData.id}`} className="text-decoration-none text-white">
                    <div className='position-relative'>
                    <img
                        src={
                        "https://image.tmdb.org/t/p/w500/" +
                        allData.poster_path
                            }
                                className="w-100"
                                alt="movies"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/img/Sorry.png";
                                }}
                                />
                            <div className={SearchStyle.rating}>
                                <p>{Math.round(allData.vote_average * 10) / 10}</p>
                            </div>
                        </div>
                        <p className="TitleImg">{allData.title || allData.name}</p>
                    
                    </Link>
                </div>
            })}
            {dataTv?.map((allData , index)=>{
                return <div key={index} className="col-md-3">
                    <Link to={`/details/tv/${allData.id}`} className="text-decoration-none text-white">
                    <div className='position-relative'>
                    <img
                        src={
                        "https://image.tmdb.org/t/p/w500/" +
                        allData.poster_path
                            }
                                className="w-100"
                                alt="movies"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/img/Sorry.png";
                                }}
                                />
                            <div className={SearchStyle.rating}>
                                <p>{Math.round(allData.vote_average * 10) / 10}</p>
                            </div>
                        </div>
                        <p className="TitleImg">{allData.name}</p>
                    
                    </Link>
                </div>
            })}
            
        </div>
    </div>
)
}
