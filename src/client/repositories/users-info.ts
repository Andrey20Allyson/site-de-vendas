import z from "zod";
import { BaseRepository, RepositoryConfig } from "./base-repository";
import { db } from "../firebase";

export const userInfoSchema = z.object({
  name: z.string(),
  email: z.string(),
  stars: z.number().array(),
});

export interface UsersInfoDTO extends z.infer<typeof userInfoSchema> { }

export class UsersInfo extends BaseRepository<UsersInfoDTO> {
  constructor(config?: RepositoryConfig) {
    super({
      collectionName: 'users-info',
      database: db,
      ...config,
    })
  }
}