import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Movie } from "../entity/Movies.entity";

export class MovieController {
  static async getAllMovies(req: Request, res: Response): Promise<void> {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      res.status(200).json({
        data,
      });
      return
    } else {
      console.log("serving from db");
      const movieRepository = AppDataSource.getRepository(Movie);
      const movies = await movieRepository.find();
      cache.put("data", movies, 10000);
      res.status(200).json({
        data: movies,
      });
      return
    }
  }
  static async createMovie(req: Request, res: Response): Promise<void> {
    const { title, description, director, year, rating, image, cast } =
      req.body;
    const movie = new Movie();
    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.year = year;
    movie.rating = rating;
    movie.image = image;
    movie.cast = cast;
    const movieRepository = AppDataSource.getRepository(Movie);
    await movieRepository.save(movie);
    res
      .status(200)
      .json({ message: "Movie created successfully", movie });
    return
  }

  static async updateMovie(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, description, director, year, rating, image, cast } =
      req.body;
    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { id },
    });
    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.year = year;
    movie.rating = rating;
    movie.image = image;
    movie.cast = cast;
    await movieRepository.save(movie);
    res
      .status(200)
      .json({ message: "Movie updated successfully", movie });
    return
  }

  static async deleteMovie(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { id },
    });
    await movieRepository.remove(movie);
    res
      .status(200)
      .json({ message: "Movie deleted successfully", movie });
    return
  }
}