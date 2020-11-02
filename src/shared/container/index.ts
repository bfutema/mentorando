import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ITeachersRepository from '@modules/teachers/repositories/ITeachersRepository';
import TeachersRepository from '@modules/teachers/infra/typeorm/repositories/TeachersRepository';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';

import IAreasRepository from '@modules/teachers/repositories/IAreasRepository';
import AreasRepository from '@modules/teachers/infra/typeorm/repositories/AreasRepository';

import ITagsRepository from '@modules/videos/repositories/ITagsRepository';
import TagsRepository from '@modules/videos/infra/typeorm/repositories/TagsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITeachersRepository>(
  'TeachersRepository',
  TeachersRepository,
);

container.registerSingleton<IStudentsRepository>(
  'StudentsRepository',
  StudentsRepository,
);

container.registerSingleton<IAreasRepository>(
  'AreasRepository',
  AreasRepository,
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);
