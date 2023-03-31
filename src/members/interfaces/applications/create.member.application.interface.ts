import { MemberDomain } from 'src/members/domain/member.domain';

export interface ICreateMemberApplication {
    create(memberDomain: MemberDomain): Promise<MemberDomain>;
}