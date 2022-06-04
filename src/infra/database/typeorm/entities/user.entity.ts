import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
  name: 'user'
})
@Index(['email', 'uuid'], { unique: true})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ default: true, name: 'is_active'})
  isActive: boolean;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

