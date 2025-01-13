import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { User } from "./User.entity"; 
  
  @Entity({ name: "reviews" })
  export class Review {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: "int4", nullable: false })
    race_id: number;
  
    @Column({ type: "uuid", nullable: false })
    user_id: string;
  
    @Column({ type: "text", nullable: false })
    review: string;
  
    @Column({ type: "int", nullable: false })
    rating: number;
  
    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;
  
    @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;
  }
  