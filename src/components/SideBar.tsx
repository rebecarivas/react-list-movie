import { Button } from './Button';
import { GenreResponseProps } from '../@types';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface ISideBar{
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({handleClickButton, selectedGenreId}: ISideBar) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}