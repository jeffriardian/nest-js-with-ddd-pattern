import { MemberDomain } from "src/members/domain/member.domain"; 

export interface IGetMemberApplication {
    getByCode(code: string): Promise<MemberDomain>;
}