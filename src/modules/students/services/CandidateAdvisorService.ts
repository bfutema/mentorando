import { injectable, inject } from 'tsyringe';

import Exceptions from '@shared/errors/Exceptions';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICandidatesRepository from '@modules/students/repositories/ICandidatesRepository';

import Candidate from '../infra/typeorm/entities/Candidate';

interface IRequest {
  user_id: string;
}

@injectable()
class CandidateAdvisorService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CandidatesRepository')
    private candidatesRepository: ICandidatesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Candidate> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Exceptions('User not found!');
    }

    if (user.teacher) {
      throw new Exceptions('Only students can be candidate!', 401);
    }

    if (user.student.is_advisor) {
      throw new Exceptions('Only students who are not advisor can apply', 403);
    }

    if (!user.student.teacher_id) {
      throw new Exceptions(
        'You need to have a linked teacher to apply to be an advisor!',
        403,
      );
    }

    const checkCandidateExists = await this.candidatesRepository.findByStudentId(
      user.student.id,
    );

    if (checkCandidateExists) {
      throw new Exceptions(
        'You already is a candidate, wait for your approval!',
        403,
      );
    }

    const candidate = await this.candidatesRepository.create({
      student_id: user.student.id,
      teacher_id: user.student.teacher_id,
    });

    return candidate;
  }
}

export default CandidateAdvisorService;
