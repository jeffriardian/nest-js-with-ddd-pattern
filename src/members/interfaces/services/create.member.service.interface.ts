import { MemberDomain } from "src/members/domain/member.domain"; 

export interface ICreateMemberService {
    create(memberDomain: MemberDomain): Promise<MemberDomain>;
}
