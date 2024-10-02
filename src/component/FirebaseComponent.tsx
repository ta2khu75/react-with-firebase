import { useEffect, useState } from 'react'
import { auth, db } from '../config/Firebase'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'
import "../css/styles.css"
import { wait } from '@testing-library/user-event/dist/utils'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const FirebaseComponent = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [movie, setMovie] = useState<Movie>()
    const moviesCollectionRef = collection(db, "movie")
    const navigate = useNavigate()
    useEffect(() => { fetchMovies() }, [])
    const fetchMovies = async () => {
        try {
            const data = await getDocs(moviesCollectionRef);
            const movieArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            if (Array.isArray(movieArray) && (typeof movieArray[0]) == 'object') {
                setMovies(movieArray)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleChangeMovie = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovie({ ...movie, [e.target.name]: e.target.value })
    }
    const handleDeleteMovie = async (movieId?: string) => {
        if (movieId) {
            const movieDoc = doc(db, "movie", movieId)
            try {
                await deleteDoc(movieDoc);
                await fetchMovies()
            } catch (error) {
                console.log(error);

            }
        }
    }
    const handleEditMovie = async (movieId?: string) => {
        if (movieId) {
            const movieDoc = doc(db, "movie", movieId)
            try {
                const docSnap = await getDoc(movieDoc);
                setMovie({ ...docSnap.data(), id: docSnap.id })
            } catch (error) {
                console.log(error);
            }

        }
    }
    const handleSubmitMovie = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (movie?.id) {
                const movieDoc = doc(db, "movie", movie.id)
                await updateDoc(movieDoc, { ...movie })
            } else {
                await addDoc(moviesCollectionRef, movie)
            }
            await fetchMovies()
            setMovie({ category: "", title: "", year: "" })
        } catch (error) {
            console.log(error);
        }
    }
    const handleLogout = async () => {
        try {
            await signOut(auth)
            navigate("/login")
        } catch (error) {

        }
    }
    return (
        <div>
            <div style={{ height: "50px" }}></div>
            <button onClick={() => handleLogout()}>Logout</button>
            <h1>Form movie</h1>
            <form onSubmit={e => handleSubmitMovie(e)}>
                <input type="text" value={movie?.title} name='title' onChange={e => handleChangeMovie(e)} placeholder="Title" /><br />
                <input type="date" value={movie?.year} name='year' onChange={(e) => handleChangeMovie(e)} placeholder="Create Date" /><br />
                <input type="text" value={movie?.category} name="category" onChange={(e) => handleChangeMovie(e)} placeholder="Category" /><br />
                <button type="submit">{movie?.id ? "Update Movie" : "Add Movie"}</button>
                <button type='reset' onClick={() => setMovie(undefined)}>Reset</button>
            </form>
            <h1>List of Movies</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.title}</td>
                            <td>{movie.year}</td>
                            <td>{movie.category}</td>
                            <td><button onClick={() => handleDeleteMovie(movie.id)}>Delete</button><button onClick={() => handleEditMovie(movie.id)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default FirebaseComponent