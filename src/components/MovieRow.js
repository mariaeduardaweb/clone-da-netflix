import React, { useState } from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import YouTube from 'react-youtube';

export default ({ title, items }) => {

    const [scrollX, setScrollX] = useState(0);
    const [trailerUrl, setTrailerUrl] = useState("");

    const handleMovieClick = async (movie) => {

        const mediaType = movie.first_air_date ? 'tv' : 'movie';

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=661b632f619760fab3d5358ec74e1562&language=pt-BR`
            );

            const data = await response.json();

            let trailer = data.results?.find(
                vid => vid.type === "Trailer" && vid.site === "YouTube"
            );

            if (!trailer) {
                const responseEn = await fetch(
                    `https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=661b632f619760fab3d5358ec74e1562&language=en-US`
                );

                const dataEn = await responseEn.json();

                trailer = dataEn.results?.find(
                    vid => vid.type === "Trailer" && vid.site === "YouTube"
                );
            }

            if (trailer) {
                setTrailerUrl(trailer.key);
            } else {
                setTrailerUrl("");
                alert("Trailer não disponível");
            }

        } catch (error) {
            console.log("Erro:", error);
        }
    };

    const closeTrailer = () => {
        setTrailerUrl("");
    };

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) x = 0;
        setScrollX(x);
    };

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items?.results?.length * 150;

        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }

        setScrollX(x);
    };

    return (
        <div className="movieRow">

            <h2>{title}</h2>

            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--listarea">
                <div
                    className="movieRow--list"
                    style={{
                        marginLeft: scrollX,
                        width: items?.results?.length * 150
                    }}
                >
                    {items?.results?.map((item, key) => (
                        <div key={key} className="movieRow--item">
                            <img
                                onClick={() => handleMovieClick(item)}
                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                alt={item.title || item.name}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {trailerUrl && (
                <div className="movieRow--trailer">

                    <button
                        className="movieRow--closeButton"
                        onClick={closeTrailer}
                    >
                        ✕
                    </button>

                    <YouTube videoId={trailerUrl} opts={opts} />

                </div>
            )}

        </div>
    );
};