import { useState} from 'react';

export default function CharForm({ onAddCharacter }) {
    const [formData, setFormData] = useState({
        name: "",
        imgUrl: "",
        films: "",
        tvShows: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    

        const newCharacter = {
            _id: crypto.randomUUID(),
            name: formData.name,
            imageUrl: formData.imgUrl,
            films: formData.films
                ? formData.films.split(",").map((f) => f.trim())
                : [],
            tvShows: formData.tvShows
                ? formData.tvShows.split(",").map((tv) => tv.trim())
                : [],
        };

        onAddCharacter(newCharacter);
        setFormData({ name: "", imgUrl: "", films: "", tvShows: ""});
    };

    return (
        <form onSubmit={handleSubmit} id="addCharacter" 
        className='bg-gray-500 p-6 rounded-xl grid grid-cols-2 gap-4 max-w-2xl mx-auto'
        >
            <fieldset>
                <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder='Character Name'
                className='p-2 bg-white rounded-md border border-gray-300 placeholder-gray-700'
                required
                />
            </fieldset>
            <fieldset>
                <input 
                type="text" 
                name="imgUrl" 
                value={formData.imgUrl}
                onChange={handleChange}
                placeholder='Image URL'
                className='p-2 bg-white rounded-md border border-gray-300 placeholder-gray-700'
                />
            </fieldset>
            <fieldset>
                <input 
                type="text" 
                name="films" 
                value={formData.films}
                onChange={handleChange}
                placeholder='Films (seperate by ,)'
                className='p-2 bg-white rounded-md border border-gray-300 placeholder-gray-700'                />
            </fieldset>
            <fieldset>
                <input 
                type="text" 
                name="tvShows" 
                value={formData.tvShows}
                onChange={handleChange}
                placeholder='TV Shows (seperate by ,)'
                className='p-2 bg-white rounded-md border border-gray-300 placeholder-gray-700'
                />
            </fieldset>
            <button type="submit" 
                className='bg-green-400 hover:bg-green-700 font-semibold font-white py-2 px-6 rounded-md mt-2'
            >
                Add Character
            </button>
        </form>
    )
}