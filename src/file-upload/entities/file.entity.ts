import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;
}
