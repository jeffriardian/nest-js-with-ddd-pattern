import { MemberDomain } from "src/members/domain/member.domain"; 

export interface IGetMemberService {
    getByCode(code: string): Promise<MemberDomain>;
}